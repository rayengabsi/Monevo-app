import BackButton from "@/components/BackButton";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/typo";
import { useAuth } from "@/config/contexts/authContext";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import { router } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Image } from "expo-image";
import { getProfileImage } from "@/services/imageService";
import Input from "@/components/Input";
import { UserDataType, WalletType } from "@/types";
import Button from "@/components/Button";
import { updateUser } from "@/services/UserService";
import * as ImagePicker from 'expo-image-picker';
import ImageUpload from "@/components/ImageUpload";

const WalletModal = () => {
  const { user, updateUserData } = useAuth();
  const [wallet, setWallet] = useState<WalletType>({
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    router.back();
  };


  const onPickImage= async ()=>{
     let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      //allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    

    if (!result.canceled) {
     // setUserData({...userData,image: result.assets[0]});
    }
  }
  const onSubmit = async () => {
    const { name, image } = wallet;
    if (!name.trim() ||   !image) {
      Alert.alert("User", "Please fill all the fields");
      return;
    }

    setLoading(true);
    const res = await updateUser(user?.uid as string, wallet);
    setLoading(false);
    
    if (res.success) {
      await updateUserData(user?.uid as string);
      router.back();
    } else {
      Alert.alert("User", res.msg);
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.customHeader}>
          <BackButton />
          <Typo style={styles.headerTitle}>
            New Wallet
          </Typo>
          <View style={styles.placeholder} />
        </View>

        {/* Form */}
        <ScrollView contentContainerStyle={styles.form}>
          
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name</Typo>
            <Input 
              placeholder="Salary"
              value={wallet.name}
              onChangeText={(value) => setWallet({...wallet, name: value})}
            />
          </View>
           <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Icon</Typo>
           <ImageUpload file={wallet.image} 
           onClear={()=>setWallet({...wallet,image: null})}
           onSelect={file=>setWallet({...wallet,image: file})} placeholder="Upload Image"/>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight={"700"}>
            Add Wallet
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
    paddingTop: spacingY._20,
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacingY._10,
    paddingHorizontal: 0,
    marginBottom: spacingY._20,
    marginTop: spacingY._10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.neutral100,
  },
  placeholder: {
    width: 40,
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