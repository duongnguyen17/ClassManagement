import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text, TextInput} from 'react-native';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';

const PopupClass = props => {
  const {dataEdit, visible, onPressCancel, onPressOK, isEdit} = props;

  const [name, setName] = useState(dataEdit.name);
  const [year, setYear] = useState(dataEdit.year);
  const [teacher, setTeacher] = useState(dataEdit.teacher);

  return (
    <Dialog
      visible={visible}
      dialogTitle={
        <DialogTitle title={isEdit ? 'Chỉnh sửa thông tin' : 'Thêm Lớp học'} />
      }
      footer={
        <DialogFooter>
          <DialogButton text="CANCEL" onPress={onPressCancel} />
          <DialogButton
            text="OK"
            onPress={() => {
              let classData = {
                _id: dataEdit._id,
                name: name,
                year: year,
                teacher: teacher,
              };
              //console.log(`userData`, userData);
              onPressOK(classData);
            }}
          />
        </DialogFooter>
      }>
      <DialogContent
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 200,
        }}>
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
              style={{fontWeight: '600', fontSize: 18}}
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontWeight: '600'}}>Khoá: </Text>
          </View>
          <View>
            <TextInput
              style={{fontWeight: '600', fontSize: 18}}
              //defaultValue={dataEdit.phoneNumber}
              value={year}
              style={{
                width: 200,
              }}
              onChangeText={text => {
                setYear(text);
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontWeight: '600'}}>GVCN: </Text>
          </View>
          <View>
            <TextInput
              style={{fontWeight: '600', fontSize: 18}}
              //defaultValue={dataEdit.phoneNumber}
              value={teacher}
              style={{
                width: 200,
              }}
              onChangeText={text => {
                setTeacher(text);
              }}
            />
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};
export default PopupClass;
