//in ra thẻ thông tin người
import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import TagInfor from '../components/TagInfor';
const TagUser = props => {

  const {userInfor, isEdit, showModal} = props
  return (
    <TouchableOpacity
      style={[
        styles.tag,
        {flexDirection: 'row', marginVertical: 5, alignItems: 'center'},
      ]}
      disabled={isEdit}
      onLongPress={() => {
        showModal(userInfor);
      }}>
      <TouchableOpacity
        disabled={isEdit}
        style={{
          width: 60,
          height: 80,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#4d94ff',
          marginHorizontal: 10,
          marginVertical: 20,
        }}>
        <Image
          style={{
            width: 60,
            height: 80,
            borderRadius: 5,
          }}
          source={{uri: userInfor.avatar}}
        />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          marginHorizontal: 25,
          marginVertical: 10,
          flexDirection: 'column',
        }}>
        <TagInfor title={'Họ tên'} content={userInfor.name} isEdit={isEdit} />
        <TagInfor title={'SĐT'} content={userInfor.phoneNumber} isEdit={isEdit} />
      </View>
    </TouchableOpacity>
  );
};
export default TagUser;
const styles = StyleSheet.create({
  tag: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 3,
    shadowColor: '#595959',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 2,
  },
});
