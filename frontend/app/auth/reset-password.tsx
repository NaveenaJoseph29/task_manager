import { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import axios from "../../src/utils/axiosConfig";

export default function ResetPasswordScreen() {
    const { token } = useLocalSearchParams();
    const [newPassword, setNewPassword] = useState("");

    const handleResetPassword = async () => {
        try {
            await axios.post(`/auth/reset-password?token=${token}`, { newPassword });
            Alert.alert("Success", "Password reset successful!");
            router.push("/auth/login");
        } catch (error) {
            Alert.alert("Error", "Invalid or expired token.");
        }
    };

    return (
        <View>
            <Text>Enter new password:</Text>
            <TextInput secureTextEntry value={newPassword} onChangeText={setNewPassword} />
            <Button title="Update Password" onPress={handleResetPassword} />
        </View>
    );
}
