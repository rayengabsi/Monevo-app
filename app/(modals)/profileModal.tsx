import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ScreenWrapper';
import Header from '@/components/Header';
import Typo from '@/components/typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import * as Icons from 'phosphor-react-native';
import { useAuth } from '@/config/contexts/authContext';

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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._15,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral600,
  },
  closeButton: {
    padding: 8,
  },
  placeholder: {
    width: 40, // Same width as close button for centering
  },
  content: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    paddingTop: spacingY._20,
    gap: spacingY._10,
  },
  userInfo: {
    backgroundColor: colors.neutral700 || '#333',
    padding: spacingX._15,
    borderRadius: 12,
    gap: spacingY._7,
    marginBottom: spacingY._10,
  },
  formSection: {
    backgroundColor: colors.neutral700 || '#333',
    padding: spacingX._15,
    borderRadius: 12,
    gap: spacingY._7,
    marginTop: spacingY._10,
  },
  saveButton: {
    backgroundColor: colors.primary || '#6366f1',
    padding: spacingY._15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: spacingY._20,
  },
});