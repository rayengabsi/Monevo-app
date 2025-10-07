// modals/TransactionModal.tsx
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
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

const TransactionModal = () => {
  const [transaction, setTransaction] = useState({
    category: "",
    date: new Date(),
    amount: "",
    description: "",
    image: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  // fake categories
  const categories = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Health", value: "health" },
  ];

  const onSubmit = () => {
    if (!transaction.amount || Number(transaction.amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }
    if (!transaction.category) {
      Alert.alert("Error", "Please select a category");
      return;
    }
    Alert.alert("Success", "Transaction saved successfully 🎉");
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setTransaction({ ...transaction, date: selectedDate });
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
            <Typo style={styles.headerTitle}>New Transaction</Typo>
            <View style={styles.placeholder} />
          </View>

          {/* Scrollable form */}
          <ScrollView
            contentContainerStyle={styles.form}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Expense Category */}
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Expense Category</Typo>
              <Dropdown
                style={styles.input}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={categories}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select category"
                value={transaction.category}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setTransaction({ ...transaction, category: item.value });
                  setIsFocus(false);
                }}
                containerStyle={styles.dropdownContainer}
                itemTextStyle={styles.itemTextStyle}
                renderRightIcon={() => (
                  <Icons.CaretDown
                    size={20}
                    color={colors.neutral400}
                    weight="bold"
                  />
                )}
              />
            </View>

            {/* Date */}
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Date</Typo>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
              >
                <Typo color={colors.white} size={14}>
                  {transaction.date.toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </Typo>
                <Icons.CalendarBlank
                  size={20}
                  color={colors.neutral400}
                  weight="bold"
                />
              </TouchableOpacity>
            </View>

            {/* Amount */}
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Amount</Typo>
              <Input
                placeholder="0.00"
                value={transaction.amount}
                onChangeText={(value) =>
                  setTransaction({ ...transaction, amount: value })
                }
                keyboardType="numeric"
              />
            </View>

            {/* Description */}
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>
                Description <Typo color={colors.neutral400}>(optional)</Typo>
              </Typo>
              <Input
                placeholder="Enter description"
                value={transaction.description}
                onChangeText={(value) =>
                  setTransaction({ ...transaction, description: value })
                }
              />
            </View>

            {/* Upload Image */}
            <View style={styles.inputContainer}>
              <Typo color={colors.neutral200}>Receipt Image (Optional)</Typo>
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
          <Button onPress={onSubmit} style={{ flex: 1 }}>
            <Typo color={colors.black} fontWeight="700">
              Add Transaction
            </Typo>
          </Button>
        </View>

        {/* Date Picker Modal for iOS */}
        {Platform.OS === "ios" && showDatePicker && (
          <Modal
            transparent
            animationType="slide"
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}
          >
            <View style={styles.datePickerModalOverlay}>
              <View style={styles.datePickerModalContent}>
                <View style={styles.datePickerHeader}>
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Typo color={colors.primary} size={16} fontWeight="600">
                      Done
                    </Typo>
                  </TouchableOpacity>
                </View>
                <DateTimePicker
                  value={transaction.date}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  textColor={colors.white}
                  themeVariant="dark"
                  style={styles.datePicker}
                />
              </View>
            </View>
          </Modal>
        )}

        {/* Date Picker for Android */}
        {Platform.OS === "android" && showDatePicker && (
          <DateTimePicker
            value={transaction.date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
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
    paddingBottom: spacingY._20,
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
    backgroundColor: colors.black,
  },
  inputContainer: {
    gap: spacingY._10,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: verticalScale(54),
    borderWidth: 1,
    borderColor: colors.neutral700,
    borderRadius: radius._12,
    paddingHorizontal: spacingX._15,
    backgroundColor: colors.neutral900,
  },
  dropdownContainer: {
    backgroundColor: colors.neutral800,
    borderRadius: radius._12,
    borderColor: colors.neutral700,
    borderWidth: 1,
  },
  placeholderStyle: {
    color: colors.neutral400,
    fontSize: scale(14),
  },
  selectedTextStyle: {
    color: colors.white,
    fontSize: scale(14),
  },
  inputSearchStyle: {
    height: 40,
    fontSize: scale(14),
    color: colors.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    color: colors.white,
    fontSize: scale(14),
  },
  // iOS Date Picker Modal Styles
  datePickerModalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  datePickerModalContent: {
    backgroundColor: colors.neutral900,
    borderTopLeftRadius: radius._20,
    borderTopRightRadius: radius._20,
    paddingBottom: spacingY._30,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._15,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral700,
  },
  datePicker: {
    backgroundColor: colors.neutral900,
    height: verticalScale(220),
  },
});