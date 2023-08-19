import { createStackNavigator } from '@react-navigation/stack'
import RegistrationForm from '../Screens/authScreens/RegistrationScreen/RegistrationScreen'
import LoginForm from '../Screens/authScreens/LoginScreen/LoginScreen'
import HomeScreen from '../Screens/Home/HomeScreen'

const AuthStack = createStackNavigator()

const useRoute = (isAuth) => {

    return (
        <AuthStack.Navigator initialRouteName="Register">
            {!isAuth && (<><AuthStack.Screen
                    options={{ headerShown: false }}
                    name="Register"
                    component={RegistrationForm}
                />
                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={LoginForm}
                />
            </>)}
            {isAuth && (<><AuthStack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeScreen}
            /></>)}
            {/* {isAuth ?
                (<><AuthStack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeScreen}
            /></>) :
                (<><AuthStack.Screen
                    options={{ headerShown: false }}
                    name="Register"
                    component={RegistrationForm}
                />
                <AuthStack.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={LoginForm}
                /></>)} */}
                
                
        </AuthStack.Navigator>
    );
  
}

export default useRoute
