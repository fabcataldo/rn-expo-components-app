import { Stack } from 'expo-router';

const ModalLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="index" />

            <Stack.Screen
                name="modal-window"
                options={{
                    presentation: 'modal',
                }}
            />

            <Stack.Screen
                name="other-modal-window"
                options={{
                    presentation: 'modal',
                }}
            />
        </Stack>
    )
}

export default ModalLayout;