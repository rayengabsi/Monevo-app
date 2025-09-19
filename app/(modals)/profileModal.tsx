import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/typo";
import { useAuth } from "@/config/contexts/authContext";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const ProfileModal = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleClose = () => {
    router.back();
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Custom Header with Close Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Icons.X size={24} color={colors.white} weight="bold" />
          </TouchableOpacity>
          <Typo size={18} fontWeight="600" color={colors.white}>
            Edit Profile
          </Typo>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.userInfo}>
            <Typo size={16} color={colors.neutral300}>
              Name: {user?.name}
            </Typo>
            <Typo size={16} color={colors.neutral300}>
              Email: {user?.email}
            </Typo>
          </View>

          <Typo size={16} color={colors.white}>
            Profile Modal Content
          </Typo>
          <Typo size={14} color={colors.neutral400}>
            Add your profile editing form here
          </Typo>

          <View style={styles.formSection}>
            <Typo size={14} color={colors.neutral400}>
              • Update profile picture
            </Typo>
            <Typo size={14} color={colors.neutral400}>
              • Change display name
            </Typo>
            <Typo size={14} color={colors.neutral400}>
              • Update bio/description
            </Typo>
            <Typo size={14} color={colors.neutral400}>
              • Change preferences
            </Typo>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleClose}>
            <Typo size={16} fontWeight="600" color={colors.white}>
              Save Changes
            </Typo>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingY._20,
    // paddingVertical: spacingY ._ 30,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1,
  },
  form: {
    gap: spacingY._30,
    marginTop: spacingY._15,
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
    borderWidth: 1,
    borderColor: colors.neutral500,
    // overflow: "hidden",
    //position: "relative",
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
