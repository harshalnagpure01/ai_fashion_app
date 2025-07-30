import firebase_admin
from firebase_admin import credentials, firestore, auth, storage, messaging
from django.conf import settings
import json
import os
from datetime import datetime


class FirebaseService:
    _instance = None
    _initialized = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(FirebaseService, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if not self._initialized:
            self.initialize_firebase()
            self._initialized = True

    def initialize_firebase(self):
        """Initialize Firebase Admin SDK"""
        if not firebase_admin._apps:
            if settings.FIREBASE_CREDENTIALS_PATH and os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
                cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
                firebase_admin.initialize_app(cred, {
                    'databaseURL': settings.FIREBASE_DATABASE_URL,
                    'storageBucket': f"{settings.FIREBASE_PROJECT_ID}.appspot.com"
                })
            else:
                # For development - use default credentials
                try:
                    firebase_admin.initialize_app()
                except Exception as e:
                    print(f"Firebase initialization failed: {e}")

        self.db = firestore.client()

    # User Management
    def get_users(self, page_token=None, max_results=1000):
        """Get users from Firebase Auth"""
        try:
            page = auth.list_users(page_token=page_token, max_results=max_results)
            users = []
            for user in page.users:
                users.append({
                    'uid': user.uid,
                    'email': user.email,
                    'display_name': user.display_name,
                    'phone_number': user.phone_number,
                    'disabled': user.disabled,
                    'email_verified': user.email_verified,
                    'created_at': user.user_metadata.creation_timestamp.isoformat() if user.user_metadata.creation_timestamp else None,
                    'last_sign_in': user.user_metadata.last_sign_in_timestamp.isoformat() if user.user_metadata.last_sign_in_timestamp else None,
                })
            return {
                'users': users,
                'next_page_token': page.next_page_token,
                'has_next_page': page.has_next_page
            }
        except Exception as e:
            print(f"Error getting users: {e}")
            return {'users': [], 'next_page_token': None, 'has_next_page': False}

    def get_user_by_uid(self, uid):
        """Get specific user by UID"""
        try:
            user = auth.get_user(uid)
            return {
                'uid': user.uid,
                'email': user.email,
                'display_name': user.display_name,
                'phone_number': user.phone_number,
                'disabled': user.disabled,
                'email_verified': user.email_verified,
                'created_at': user.user_metadata.creation_timestamp.isoformat() if user.user_metadata.creation_timestamp else None,
                'last_sign_in': user.user_metadata.last_sign_in_timestamp.isoformat() if user.user_metadata.last_sign_in_timestamp else None,
            }
        except Exception as e:
            print(f"Error getting user {uid}: {e}")
            return None

    def disable_user(self, uid):
        """Disable a user account"""
        try:
            auth.update_user(uid, disabled=True)
            return True
        except Exception as e:
            print(f"Error disabling user {uid}: {e}")
            return False

    def delete_user(self, uid):
        """Delete a user account"""
        try:
            auth.delete_user(uid)
            return True
        except Exception as e:
            print(f"Error deleting user {uid}: {e}")
            return False

    # Content Management
    def get_flagged_content(self):
        """Get flagged polls and comments"""
        try:
            flagged_polls = self.db.collection('polls').where('flagged', '==', True).stream()
            flagged_comments = self.db.collection('comments').where('flagged', '==', True).stream()
            
            polls = []
            for poll in flagged_polls:
                poll_data = poll.to_dict()
                poll_data['id'] = poll.id
                poll_data['type'] = 'poll'
                polls.append(poll_data)
            
            comments = []
            for comment in flagged_comments:
                comment_data = comment.to_dict()
                comment_data['id'] = comment.id
                comment_data['type'] = 'comment'
                comments.append(comment_data)
            
            return {'polls': polls, 'comments': comments}
        except Exception as e:
            print(f"Error getting flagged content: {e}")
            return {'polls': [], 'comments': []}

    def remove_content(self, content_id, content_type):
        """Remove flagged content"""
        try:
            collection = 'polls' if content_type == 'poll' else 'comments'
            self.db.collection(collection).document(content_id).delete()
            return True
        except Exception as e:
            print(f"Error removing content {content_id}: {e}")
            return False

    # Analytics
    def get_user_analytics(self):
        """Get user analytics data"""
        try:
            # Total users
            users_ref = self.db.collection('users')
            total_users = len(list(users_ref.stream()))
            
            # Active users (last 24 hours)
            from datetime import datetime, timedelta
            yesterday = datetime.now() - timedelta(days=1)
            active_users = self.db.collection('user_sessions').where('last_active', '>=', yesterday).stream()
            daily_active_users = len(list(active_users))
            
            return {
                'total_users': total_users,
                'daily_active_users': daily_active_users
            }
        except Exception as e:
            print(f"Error getting user analytics: {e}")
            return {'total_users': 0, 'daily_active_users': 0}

    def get_engagement_analytics(self):
        """Get engagement analytics"""
        try:
            # Closet uploads
            closet_uploads = len(list(self.db.collection('closet_items').stream()))
            
            # Poll count
            poll_count = len(list(self.db.collection('polls').stream()))
            
            # Voting engagement
            votes = list(self.db.collection('votes').stream())
            voting_engagement = len(votes)
            
            return {
                'closet_uploads': closet_uploads,
                'poll_count': poll_count,
                'voting_engagement': voting_engagement
            }
        except Exception as e:
            print(f"Error getting engagement analytics: {e}")
            return {'closet_uploads': 0, 'poll_count': 0, 'voting_engagement': 0}

    def get_revenue_analytics(self):
        """Get revenue analytics"""
        try:
            # Subscription revenue
            subscriptions = self.db.collection('subscriptions').where('status', '==', 'active').stream()
            subscription_revenue = 0
            for sub in subscriptions:
                sub_data = sub.to_dict()
                subscription_revenue += sub_data.get('amount', 0)
            
            # Ad revenue
            ad_revenue_docs = self.db.collection('ad_revenue').stream()
            ad_revenue = 0
            for doc in ad_revenue_docs:
                ad_data = doc.to_dict()
                ad_revenue += ad_data.get('amount', 0)
            
            return {
                'subscription_revenue': subscription_revenue,
                'ad_revenue': ad_revenue,
                'total_revenue': subscription_revenue + ad_revenue
            }
        except Exception as e:
            print(f"Error getting revenue analytics: {e}")
            return {'subscription_revenue': 0, 'ad_revenue': 0, 'total_revenue': 0}

    # Notifications
    def send_notification(self, title, body, target_type='all', target_value=None, scheduled_time=None):
        """Send push notification via FCM"""
        try:
            if target_type == 'all':
                # Send to all users topic
                message = messaging.Message(
                    notification=messaging.Notification(
                        title=title,
                        body=body,
                    ),
                    topic='all_users'
                )
            elif target_type == 'user':
                # Send to specific user
                message = messaging.Message(
                    notification=messaging.Notification(
                        title=title,
                        body=body,
                    ),
                    token=target_value  # FCM token
                )
            else:
                return {'success': False, 'error': 'Invalid target type'}

            if scheduled_time:
                # For scheduled notifications, store in Firestore
                notification_data = {
                    'title': title,
                    'body': body,
                    'target_type': target_type,
                    'target_value': target_value,
                    'scheduled_time': scheduled_time,
                    'status': 'scheduled',
                    'created_at': datetime.now()
                }
                self.db.collection('scheduled_notifications').add(notification_data)
                return {'success': True, 'message': 'Notification scheduled'}
            else:
                response = messaging.send(message)
                return {'success': True, 'message_id': response}
        except Exception as e:
            print(f"Error sending notification: {e}")
            return {'success': False, 'error': str(e)}

    # Subscriptions
    def get_subscriptions(self):
        """Get all subscriptions"""
        try:
            subscriptions = []
            docs = self.db.collection('subscriptions').stream()
            for doc in docs:
                sub_data = doc.to_dict()
                sub_data['id'] = doc.id
                subscriptions.append(sub_data)
            return subscriptions
        except Exception as e:
            print(f"Error getting subscriptions: {e}")
            return []

    def update_subscription_pricing(self, plan_type, amount):
        """Update subscription pricing"""
        try:
            self.db.collection('subscription_plans').document(plan_type).set({
                'amount': amount,
                'updated_at': datetime.now()
            }, merge=True)
            return True
        except Exception as e:
            print(f"Error updating subscription pricing: {e}")
            return False

    # Settings
    def update_feature_flag(self, flag_name, enabled):
        """Update feature flag"""
        try:
            self.db.collection('settings').document('feature_flags').set({
                flag_name: enabled,
                'updated_at': datetime.now()
            }, merge=True)
            return True
        except Exception as e:
            print(f"Error updating feature flag: {e}")
            return False

    def update_threshold(self, threshold_name, value):
        """Update threshold value"""
        try:
            self.db.collection('settings').document('thresholds').set({
                threshold_name: value,
                'updated_at': datetime.now()
            }, merge=True)
            return True
        except Exception as e:
            print(f"Error updating threshold: {e}")
            return False


# Singleton instance
firebase_service = FirebaseService()