import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Redirect } from 'expo-router';

export default function Index() {
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkUserToken = async () => {
            try {
                const token = await SecureStore.getItemAsync('accessToken'); 
                setLoggedInUser(!!token); 
            } catch (error) {
                console.error('Error accessing SecureStore:', error);
            } finally {
                setLoading(false); 
            }
        };

        checkUserToken();
    }, []);

    if (loading) {
        return null; 
    }

    return <Redirect href={!loggedInUser ? 'Onboarding' : '/(tabs)'} />;
}
