import { ResponseType, WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import { firestore } from "@/config/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

export const createOrUpdateWallet = async (
  walletData: Partial<WalletType>
): Promise<ResponseType> => {
  let walletToSave = { ...walletData };
  
  if (walletData.image) {
    const imageUploadRes = await uploadFileToCloudinary(walletData.image, "wallets");
    if (!imageUploadRes.success) {
      return {
        success: false,
        msg: imageUploadRes.msg || "Failed to upload wallet icon",
      };
    }
    walletToSave.image = imageUploadRes.data;
  }

  try {
    if (!walletData?.id) {
      // New wallet - set default values
      walletToSave.amount = 0;
      walletToSave.totalIncome = 0;
      walletToSave.totalExpenses = 0;
      walletToSave.created = new Date();
      
      // Use addDoc for new documents - it auto-generates an ID
      const docRef = await addDoc(collection(firestore, "wallets"), walletToSave);
      return { success: true, msg: "Wallet created successfully", data: docRef.id };
    } else {
      // Update existing wallet
      const walletRef = doc(firestore, "wallets", walletData.id);
      await setDoc(walletRef, walletToSave, { merge: true });
      return { success: true, msg: "Wallet updated successfully", data: walletData.id };
    }
  } catch (error: any) {
    console.error("Creating or updating wallet:", error);
    return { success: false, msg: error.message };
  }
};