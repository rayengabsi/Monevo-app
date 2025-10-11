import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TransactionItemProps, TransactionListType, TransactionType } from "@/types";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import Typo from "./typo";
import { FlashList } from "@shopify/flash-list";
import Loading from "./Loading";
import { expenseCategories, incomeCategory } from "@/constants/data";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "expo-router";

const TransactionList = ({
  data,
  title,
  loading,
  emptyListMessage,
}: TransactionListType) => {
  
 const router = useRouter();
const handleClick = (item: TransactionType) =>
  router.push({
    pathname: "/(modals)/transactionModel",
    params: {
      id: item?.id,
      type: item?.type,
      amount: item?.amount?.toString(),
      category: item?.category,
      date: (item.date as Timestamp)?.toDate()?.toISOString(),
      description: item?.description,
      image: item?.image,
      uid: item?.uid,
      walletId: item?.walletId,
    },
  });


  return (
    <View style={styles.container}>
      {title && (
        <Typo fontWeight={"500"}>
          {title}
        </Typo>
      )}
      
      {loading ? (
        <View style={{ marginTop: verticalScale(100) }}>
          <Loading />
        </View>
      ) : data.length === 0 ? (
        <Typo
          size={15}
          color={colors.neutral400}
          style={{ textAlign: "center", marginTop: spacingY._15 }}
        >
          {emptyListMessage}
        </Typo>
      ) : (
        <View style={{ flex: 1, minHeight: 2 }}>
          <FlashList
            data={data}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item, index }) => (
              <TransactionItem
                item={item}
                index={index}
                handleClick={handleClick}
              />
            )}
            getItemType={() => "transaction"}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

const TransactionItem = ({
  item,
  index,
  handleClick,
}: TransactionItemProps) => {

  let category = 
    item?.type === "income" 
      ? incomeCategory 
      : expenseCategories[item.category!];
  
  const IconComponent = category?.icon;
  
  const date = (item?.date as Timestamp)?.toDate()?.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });

  if (!category) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 70).springify().damping(14)}
    >
      <TouchableOpacity 
        style={styles.row} 
        onPress={() => handleClick(item)}
      >
        <View style={[styles.icon, { backgroundColor: category?.bgColor }]}>
          {IconComponent && (
            <IconComponent size={25} weight="fill" color="white" />
          )}
        </View>
        <View style={styles.categoryDes}>
          <Typo size={17}>{category?.label}</Typo>
          <Typo
            size={12}
            color={colors.neutral400}
            textProps={{ numberOfLines: 1 }}
          >
            {item?.description || 'No description'}
          </Typo>
        </View>
        <View style={styles.amountDate}>
          <Typo 
            fontWeight={"500"} 
            color={item?.type === 'income' ? colors.primary : colors.rose}
          >
            {item?.type === "income" ? `+ $${item?.amount}` : `- $${item?.amount}`}
          </Typo>
          <Typo size={12} color={colors.neutral400}>
            {date}
          </Typo>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    gap: spacingY._17,
    flex: 1,
  
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacingX._12,
    marginBottom: spacingY._12,
    backgroundColor: colors.neutral800,
    padding: spacingY._10,
    paddingHorizontal: spacingX._12,
    borderRadius: radius._17,
  },
  icon: {
    height: verticalScale(44),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius._12,
    borderCurve: "continuous",
  },
  categoryDes: {
    flex: 1,
    gap: 2.5,
    paddingLeft: spacingX._12,
  },
  amountDate: {
    alignItems: "flex-end",
    gap: 3,
  },
});