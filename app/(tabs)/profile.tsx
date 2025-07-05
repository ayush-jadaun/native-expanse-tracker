import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { getProfileImage } from "@/services/imageService";
import { accountOptionType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import * as Icons from "phosphor-react-native";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { useAuth } from "../contexts/authContext";
import Animated, { FadeInDown } from "react-native-reanimated";
import { signOut } from "firebase/auth";
import { auth } from "../(auth)/config/firebase";
import { useRouter } from "expo-router";
const Profile = () => {

  const router = useRouter()
  const { user } = useAuth();

  const accountOptions: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.UserIcon size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/profileModal",
      bgColor: "#6366f1",
    },
    {
      title: "Settings",
      icon: <Icons.GearSixIcon size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/profileModal",
      bgColor: "#6366f1",
    },
    {
      title: "Privacy Policy",
      icon: <Icons.LockIcon size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/profileModal",
      bgColor: "#6366f1",
    },
    {
      title: "Logout",
      icon: <Icons.PowerIcon size={26} color={colors.white} weight="fill" />,
      routeName: "/(modals)/profileModal",
      bgColor: "#6366f1",
    },
  ];

  const handleLogout = async()=>{
    await signOut(auth);
  }

  const showLogoutAlert = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [

      {
        text:"Cancel",
        onPress:()=> console.log('Cancel Logout'),
        style:'cancel'
      },
      {
        text:"Logout",
        onPress:()=>handleLogout(),
        style:'destructive'
      }
    ]

      
    )
  }

  const handlePress = async (item:accountOptionType)=>{
    if(item.title=='Logout'){
      showLogoutAlert();
    }

    if(item.routeName) router.push(item.routeName)
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" style={{ marginVertical: spacingY._10 }} />

        <View style={styles.userInfo}>
          <View>
            <Image
              source={getProfileImage(user?.image)}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
          </View>
          <View style={styles.nameContainer}>
            <Typo size={24} fontWeight={"600"} color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </View>
        <View style={styles.accountOptions}>
          {accountOptions.map((item, index) => {
            return (
            
            <Animated.View style={styles.listItem} entering={FadeInDown.delay(index*50).springify().damping(14)} key={index.toString()}>
              <TouchableOpacity style={styles.flexRow} onPress={()=>handlePress(item)} >

                <View
                style={[styles.listIcon,
                  {backgroundColor:item?.bgColor || colors.neutral500, marginRight: spacingX._10, alignItems: "center", justifyContent: "center" }
                ]}>
                {item.icon && item.icon}
                </View>

              </TouchableOpacity>








            </Animated.View>
         ) })}
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
  },
  nameContainer: {
    gap: verticalScale(4),
    alignItems: "center",
  },
  listIcon: {
    height: verticalScale(44),
    width: verticalScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(17),
    flexDirection: "row",
    alignItems: "center",
  },
  accountOptions: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});
