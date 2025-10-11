
// modals/TransactionModal.tsx
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";

import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/utils/styling";
import * as Icons from "phosphor-react-native";
import { useAuth } from "@/config/contexts/authContext";
import { TransactionType } from "@/types";
import { expenseCategories, transactionTypes } from "@/constants/data";
import { orderBy, where, Timestamp } from "firebase/firestore";
import useFetchData from "@/hooks/useFetchData";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createOrUpdateTransaction, deleteTransaction } from "@/services/transactionService";

const TransactionModal = () => {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [transaction, setTransaction] = useState<TransactionType>({
    type: "expense",
    category: "",
    date: new Date(),
    amount: 0,
    description: "",
    walletId: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const {
    data: wallets,
    error: walletError,
    loading: walletLoading,
  } = useFetchData("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  // Load existing transaction data if editing
  useEffect(() => {
    if (params?.id) {
      let date: Date;
      
      // Handle different date formats
      if (params.date) {
        if (typeof params.date === 'string') {
          date = new Date(params.date);
        } else if ((params.date as any)?.toDate) {
          // It's a Firestore Timestamp
          date = (params.date as any).toDate();
        } else {
          date = new Date();
        }
      } else {
        date = new Date();
      }

      setTransaction({
        id: params.id as string,
        type: params.type as string,
        amount: Number(params.amount),
        description: params.description as string || "",
        category: params.category as string || "",
        date: date,
        walletId: params.walletId as string,
        image: params.image || null,
      });
    }
  }, [params.id]); // Only depend on params.id to prevent infinite loop

  const onDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || transaction.date;
    setTransaction({ ...transaction, date: currentDate });
    setShowDatePicker(Platform.OS === "ios" ? true : false);
  };
const onDelete = async () => {
  if (!transaction?.id) return;
  setLoading(true);
  const res = await deleteTransaction(transaction.id, transaction.walletId);
  setLoading(false);
  if (res.success) {
    router.back();
  } else {
    Alert.alert("Transaction", res.msg);
  }
};
  const showDeleteAlert = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this transaction?",
      [{ text: "Cancel",
        onPress:()=> console.log("cancel delete"),
        style:"cancel"},
        {
          text: "Delete",
          onPress:()=> onDelete(),
          style:"destructive",
        },
        ]
    );
  };

 const onSubmit = async () => {
  const { type, amount, description, category, date, walletId, image, id } = transaction;
  
  if (!walletId || !date || !amount || (type === "expense" && !category)) {
    Alert.alert("Transaction", "Please fill all the fields");
    return;
  }

  const transactionData: TransactionType = {
    ...(id && { id }), // Conditionally include id if it exists
    type,
    amount,
    description,
    category,
    date,
    walletId,
    image: image? image :null,
    uid: user?.uid,
  };

  setLoading(true);
  const res = await createOrUpdateTransaction(transactionData);
  setLoading(false);
  
  if (res.success) {
    router.back();
  } else {
    Alert.alert("Transaction", res.msg);
  }
};

  return (
    <ModalWrapper>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.customHeader}>
            <BackButton />
            <Typo style={styles.headerTitle}>
              {transaction.id ? "Edit Transaction" : "New Transaction"}
            </Typo>
            <View style={styles.placeholder} />
          </View>

          {/* Scrollable form */}
          <ScrollView
            contentContainerStyle={styles.form}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* transaction types */}
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200} size={16}>
                Type
              </Typo>
              <Dropdown
                style={styles.dropdownContainer}
                activeColor={colors.neutral700}
                selectedTextStyle={styles.dropdownSelectedText}
                iconStyle={styles.dropdownIcon}
                data={transactionTypes}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={styles.dropdownItemText}
                itemContainerStyle={styles.dropdownItemContainer}
                containerStyle={styles.dropdownListContainer}
                value={transaction.type}
                onChange={(item) => {
                  setTransaction({ ...transaction, type: item.value });
                }}
              />
            </View>

            {/* wallet */}
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200} size={16}>
                Wallet
              </Typo>
              <Dropdown
                style={styles.dropdownContainer}
                activeColor={colors.neutral700}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelectedText}
                iconStyle={styles.dropdownIcon}
                data={wallets.map((wallet) => ({
                  label: `${wallet?.name} ($${wallet.amount})`,
                  value: wallet?.id,
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                itemTextStyle={styles.dropdownItemText}
                itemContainerStyle={styles.dropdownItemContainer}
                containerStyle={styles.dropdownListContainer}
                placeholder="Select wallet"
                value={transaction.walletId}
                onChange={(item) => {
                  setTransaction({
                    ...transaction,
                    walletId: item.value || "",
                  });
                }}
              />
            </View>

            {/* Expense Category */}
            {transaction.type === "expense" && (
              <View style={styles.inputContainer}>
                <Typo color={colors.neutral200} size={16}>
                  Expense Category
                </Typo>
                <Dropdown
                  style={styles.dropdownContainer}
                  activeColor={colors.neutral700}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={styles.dropdownSelectedText}
                  iconStyle={styles.dropdownIcon}
                  data={Object.values(expenseCategories)}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  itemTextStyle={styles.dropdownItemText}
                  itemContainerStyle={styles.dropdownItemContainer}
                  containerStyle={styles.dropdownListContainer}
                  placeholder="Select category"
                  value={transaction.category}
                  onChange={(item) => {
                    setTransaction({
                      ...transaction,
                      category: item.value || "",
                    });
                  }}
                />
              </View>
            )}

            {/* Date */}
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200} size={16}>
                Date
              </Typo>
              <Pressable
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Typo size={14}>
                  {(transaction.date as Date).toLocaleDateString()}
                </Typo>
                <Icons.CalendarBlank
                  size={20}
                  color={colors.neutral400}
                  weight="bold"
                />
              </Pressable>
              {showDatePicker && (
                <View style={Platform.OS === "ios" && styles.iosDatePicker}>
                  <DateTimePicker
                    value={transaction.date as Date}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onDateChange}
                    textColor={colors.white}
                    style={styles.datePicker}
                  />

                  {Platform.OS === "ios" && (
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Typo size={15} fontWeight="500">
                        Ok
                      </Typo>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>

            {/* Amount */}
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200} size={16}>
                Amount
              </Typo>
              <Input
                keyboardType="numeric"
                value={transaction.amount?.toString()}
                onChangeText={(value) =>
                  setTransaction({
                    ...transaction,
                    amount: Number(value.replace(/[^0-9]/g, "")),
                  })
                }
              />
            </View>

            {/* Description */}
            <View style={styles.inputContainer}>
              <View style={styles.flexRow}>
                <Typo color={colors.neutral200} size={16}>
                  Description
                </Typo>
                <Typo color={colors.neutral500} size={14}>
                  (optional)
                </Typo>
              </View>

              <Input
                placeholder="Enter description"
                value={transaction.description}
                multiline
                containerStyle={{
                  flexDirection: "row",
                  height: verticalScale(100),
                  alignItems: "flex-start",
                  paddingVertical: 15,
                }}
                onChangeText={(value) =>
                  setTransaction({ ...transaction, description: value })
                }
              />
            </View>

            {/* Upload Image */}
            <View style={styles.inputContainer}>
              <View style={styles.flexRow}>
                <Typo color={colors.neutral200} size={16}>
                  Receipt
                </Typo>
                <Typo color={colors.neutral500} size={14}>
                  (optional)
                </Typo>
              </View>

              <ImageUpload
                file={transaction.image}
                onClear={() =>
                  setTransaction({ ...transaction, image: null })
                }
                onSelect={(file) =>
                  setTransaction({ ...transaction, image: file })
                }
                placeholder="Upload Receipt"
              />
            </View>
          </ScrollView>
        </View>

        {/* Footer pinned at bottom */}
        <View style={styles.footer}>
          {transaction.id && !loading && (
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
              {transaction.id ? "Update" : "Submit"}
            </Typo>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </ModalWrapper>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
    paddingTop: spacingY._20,
  },
  customHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacingY._20,
    paddingTop: spacingY._10,
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  form: {
    gap: spacingY._20,
    paddingBottom: spacingY._40,
    paddingVertical: spacingX._15,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingVertical: spacingY._15,
    borderTopColor: colors.neutral700,
    borderTopWidth: 1,
    marginBottom: spacingY._5,
  },
  dropdownPlaceholder: {
    color: colors.white,
  },
  inputContainer: {
    gap: spacingY._10,
  },
  dropdownListContainer: {
    backgroundColor: colors.neutral900,
    paddingVertical: spacingY._7,
    top: 5,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderColor: colors.neutral500,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    borderWidth: 1,
    borderCurve: "continuous",
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  dropdownContainer: {
    height: verticalScale(54),
    paddingHorizontal: spacingX._15,
    borderRadius: radius._15,
    borderColor: colors.neutral300,
    borderWidth: 1,
    borderCurve: "continuous",
  },
  dropdownSelectedText: {
    color: colors.white,
    fontSize: verticalScale(14),
  },
  dropdownItemText: {
    color: colors.white,
  },
  dropdownIcon: {
    height: verticalScale(30),
    tintColor: colors.neutral300,
  },
  dropdownItemContainer: {
    borderRadius: radius._15,
    marginHorizontal: spacingX._7,
  },
  iosDatePicker: {},
  datePicker: {
    backgroundColor: colors.neutral800,
    height: verticalScale(220),
  },
  datePickerButton: {
    backgroundColor: colors.neutral700,
    alignSelf: "flex-end",
    padding: spacingY._7,
    marginRight: spacingX._7,
    paddingHorizontal: spacingY._15,
    borderRadius: radius._10,
  },
  dateInput: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
  },
});