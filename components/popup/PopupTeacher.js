import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text, TextInput} from 'react-native';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';
import {launchImageLibrary} from 'react-native-image-picker';

const PopupTeacher = props => {
  const {dataEdit, visible, onPressCancel, onPressOK, isEdit} = props;
  const [name, setName] = useState(dataEdit.name);
  const [grade, setGrade] = useState(dataEdit.grade);
  const [phoneNumber, setPhoneNumber] = useState(dataEdit.phoneNumber);
  const [avatar, setAvatar] = useState(dataEdit.avatar);

  const choosedPhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      //console.log(`response`, response);
      if (
        !response.didCancel &&
        response.assets[0] !== undefined &&
        response.assets[0] !== null
      ) {
        // console.log(`response`, response.assets[0].uri);
        setAvatar(response.assets[0].uri);
      }
    });
  };
  //console.log(`avatar`, avatar);
  return (
    <Dialog
      visible={visible}
      dialogTitle={
        <DialogTitle
          title={isEdit ? 'Chỉnh sửa thông tin' : 'Thêm giáo viên'}
        />
      }
      footer={
        <DialogFooter>
          <DialogButton text="CANCEL" onPress={onPressCancel} />
          <DialogButton
            text="OK"
            onPress={() => {
              let userData = {
                _id: dataEdit._id,
                name: name,
                phoneNumber: phoneNumber,
                avatar: avatar,
              };
              //console.log(`userData`, userData);
              onPressOK(userData);
            }}
          />
        </DialogFooter>
      }>
      <DialogContent
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 400,
        }}>
        <TouchableOpacity
          style={{marginTop: 10, backgroundColor: 'gray'}}
          onPress={choosedPhoto}>
          <Image
            style={{
              width: 180,
              height: 240,
              borderRadius: 5,
            }}
            source={
              avatar === undefined || avatar === ''
                ? require('../../assets/teacher.jpg')
                : {uri: avatar}
            }
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontWeight: '600'}}>Họ tên: </Text>
            </View>
            <View>
              <TextInput
                style={{fontWeight: '600', fontSize: 18, color: '#000'}}
                //defaultValue={dataEdit.name}
                value={name}
                style={{
                  width: 200,
                }}
                onChangeText={text => {
                  setName(text);
                }}
              />
            </View>
          </View>
          {dataEdit.grade === undefined ? null : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{fontWeight: '600'}}>Lớp: </Text>
              </View>
              <View>
                <TextInput
                  style={{fontWeight: '600', fontSize: 18, color: '#000'}}
                  //defaultValue={dataEdit.grade}
                  value={grade}
                  style={{
                    width: 200,
                  }}
                  onChangeText={text => {
                    setGrade(text);
                  }}
                />
              </View>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontWeight: '600'}}>SĐT: </Text>
            </View>
            <View>
              <TextInput
                style={{fontWeight: '600', fontSize: 18, color: '#000'}}
                //defaultValue={dataEdit.phoneNumber}
                value={phoneNumber}
                style={{
                  width: 200,
                }}
                onChangeText={text => {
                  setPhoneNumber(text);
                }}
              />
            </View>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};
export default PopupTeacher;
