ionic start devdacticApp tabs --type=angular --capacitor
cd ./devdacticApp
 
# Manage your authentication state (and API calls)
ionic g service services/authentication
 
# Additional Pages
ionic g page pages/intro
ionic g page pages/login
 
# Secure inside area
ionic g guard guards/auth --implements CanLoad
 
# Show intro automatically once
ionic g guard guards/intro --implements CanLoad
 
# Automatically log in users
ionic g guard guards/autoLogin --implements CanLoad