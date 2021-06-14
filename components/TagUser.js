import React from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import Swipeout from 'react-native-swipeout';
const TagTeacher = props => {
  const {position, userInfor, onPressItem, editUser, deleteUser} = props;
  //console.log(`userInfor`, userInfor);
  
  return (
    <Swipeout
      right={[
        {
          text: 'Edit',
          onPress: () => {
            editUser(userInfor);
          },
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteUser(userInfor);
          },
        },
      ]}
      autoClose={true}
      style={{backgroundColor: '#f2f2f2'}}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.tag, {flexDirection: 'row', alignItems: 'center'}]}
        onPress={onPressItem}>
        <View
          style={{
            width: 60,
            height: 80,
            borderRadius: 5,
            marginHorizontal: 10,
            marginVertical: 20,
          }}>
          <Image
            style={{
              width: 60,
              height: 80,
              borderRadius: 5,
            }}
            source={
              userInfor.avatar === undefined ||
              userInfor.avatar === '' ||
              userInfor.avatar === null
                ? position === 'teacher'
                  ? require('../assets/teacher.jpg')
                  : require('../assets/student.png')
                : {uri: userInfor.avatar}
            }
          />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 25,
            marginVertical: 10,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontWeight: '600'}}>Họ tên: </Text>
            </View>
            <Text style={{fontWeight: '600', fontSize: 18}}>
              {userInfor.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontWeight: '600'}}>SĐT: </Text>
            </View>
            <View>
              <Text style={{fontWeight: '600', fontSize: 18}}>
                {userInfor.phoneNumber}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};
export default TagTeacher;
const styles = StyleSheet.create({
  tag: {
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 2,
    shadowColor: '#595959',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },
});
