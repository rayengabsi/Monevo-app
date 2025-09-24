import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/typo";
import { useAuth } from "@/config/contexts/authContext";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { createOrUpdateWallet, deleteWallet } from "@/services/walletService";
import { WalletType } from "@/types";
import { scale, verticalScale } from "@/utils/styling";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

const WalletModal = () => {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<WalletType>({ name: "", image: null });
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const oldWallet: { name: string; image: string; id: string } =
    useLocalSearchParams();

  useEffect(() => {
    if (oldWallet?.id) {
      setWallet({ name: oldWallet?.name, image: oldWallet?.image });
    }
  }, []);

  const onSubmit = async () => {
    const { name, image } = wallet;
    if (!name.trim()) {
      Alert.alert("Wallet", "Please fill the wallet name");
      return;
    }

    const data: WalletType = {
      uid: user?.uid,
      name,
      image,
    };

    if (oldWallet?.id) data.id = oldWallet.id;

    setLoading(true);
    const res = await createOrUpdateWallet(data);
    setLoading(false);

    if (res.success) {
      router.back();
    } else {
      Alert.alert("Error", res.msg || "Something went wrong");
    }
  };
  const onDelete = async () => {
    if (!oldWallet?.id) return;
    setLoading(true);
    const res = await deleteWallet(oldWallet.id);
    setLoading(false);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Wallet", res.msg);
    }
  };

  const showDeleteAlert = () => {
    Alert.alert(
      "confirm",
      "Are you sure you want to do this? \nThis action will remove all the transactions related to this wallet",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel delete"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDelete(),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <View style={styles.customHeader}>
          <BackButton />
          <Typo style={styles.headerTitle}>
            {oldWallet?.id ? "Update Wallet" : "New Wallet"}
          </Typo>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name</Typo>
            <Input
              placeholder="Salary"
              value={wallet.name}
              onChangeText={(value) => setWallet({ ...wallet, name: value })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Icon</Typo>
            <ImageUpload
              file={wallet.image}
              onClear={() => setWallet({ ...wallet, image: null })}
              onSelect={(file) => setWallet({ ...wallet, image: file })}
              placeholder="Upload Image"
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {oldWallet?.id && !loading && (
          <Button
            onPress={showDeleteAlert}
            style={{
              backgroundColor: colors.rose,
              paddingHorizontal: spacingX._15,
            }}
          >
            <Icons.Trash
              color={colors.white}
              size={verticalScale(24)}
              weight="bold"
            />
          </Button>
        )}

        <Button onPress={onSubmit} loading={loading} style={{ flex: 1 }}>
          <Typo color={colors.black} fontWeight="700">
            {oldWallet?.id ? "Update Wallet" : "Add Wallet"}
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  container: {
 
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
  placeholder: { width: 40 },
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
  inputContainer: { gap: spacingY._10 },
});
