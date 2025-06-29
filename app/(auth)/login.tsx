import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import React, { useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";

const login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if(!emailRef.current || !passwordRef.current){
        Alert.alert("Login","Please fill all the fields")
        return;
    }
    console.log("email is: ", emailRef.current)
    console.log("password is: ", passwordRef.current)
    console.log("good to go");
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28} />
        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight={"800"}>
            Hey,
          </Typo>
          <Typo>Welcome Back</Typo>
        </View>
        {/**Form  */}
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Login Now to track all your expanses
          </Typo>
          <Input
            placeholder="Enter your email"
            onChangeText={(value) => {
              emailRef.current = value;
            }}
            icon={<Icons.At size={verticalScale(26)} weight="fill" />}
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => {
              passwordRef.current = value;
            }}
            icon={<Icons.Lock size={verticalScale(26)} weight="fill"  />}
          />

          <Typo size={14} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Forget Password
          </Typo>

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>
              Login
            </Typo>
          </Button>
        </View>
        <View style={styles.footer}>
          <Typo size={15}> Don't have an account?</Typo>
          <Pressable onPress={() => router.navigate("/register")}>
            <Typo size={15} fontWeight={"700"} color={colors.primary}>
              Sign Up
            </Typo>
          </Pressable>
        </View>

        <View></View>
      </View>
    </ScreenWrapper>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._30,
    gap: spacingY._20,
  },
  form: {
    gap: spacingY._10,
  },
  welcomeText: {
    fontSize: verticalScale(20),
    fontWeight: "bold",
    color: colors.text,
  },
  forgetPassword: {
    textAlign: "right",
    fontWeight: "500",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});
