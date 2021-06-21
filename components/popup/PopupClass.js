import React, {useState, useEffect} from 'react';
import {
  View,
  Alert,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  DialogTitle,
} from 'react-native-popup-dialog';

const PopupClass = props => {
  const {dataEdit, visible, onPressCancel, onPressOK, isEdit} = props;

  const [items, setItems] = useState(props.items);
  const [name, setName] = useState(null);
  const [year, setYear] = useState(null);
  const [teacher, setTeacher] = useState(null); //tên giáo viên
  useEffect(() => {
    setName(dataEdit.name);
    setYear(dataEdit.year);
    setTeacher(dataEdit.teacher._id);
  }, [dataEdit]);
  useEffect(() => {
    setItems(props.items);
  }, [props.items]);
  const submit = () => {
    if (!name) {
      Alert.alert('Tên lớp không đúng!', 'Không được bỏ trống tên lớp.', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else if (!teacher) {
      Alert.alert('Sai giáo viên!', 'Không được để trống GVCN.', [
        {text: 'OK', onPress: () => {}},
      ]);
    } else {
      let classData = {
        _id: dataEdit._id === undefined ? Date.now() : dataEdit._id,
        name: name,
        year: year,
        teacher: teacher,
      };
      // console.log(`teacher`, classData.teacher);
      onPressOK(classData);
    }
  };
  //console.log(`items`, items);
  return (
    <Dialog
      visible={visible}
      dialogTitle={
        <DialogTitle title={isEdit ? 'Chỉnh sửa thông tin' : 'Thêm Lớp học'} />
      }
      footer={
        <DialogFooter>
          <DialogButton text="CANCEL" onPress={onPressCancel} />
          <DialogButton text="OK" onPress={submit} />
        </DialogFooter>
      }>
      <DialogContent>
        <View
          style={{
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
                placeholder="Nhập tên lớp..."
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
                placeholder="Nhập khoá học..."
                style={{fontWeight: '600', fontSize: 18, color: '#000'}}
                //defaultValue={dataEdit.phonenumber}
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
          <View style={{}}>
            <Text style={{fontWeight: '600'}}>GVCN: </Text>

            <RNPickerSelect
              placeholder={{
                label: 'Chọn GVCN...',
                value: null,
              }}
              value={teacher}
              items={items}
              onValueChange={value => {
                //console.log(`value`, value);
                setTeacher(value);
              }}
            />
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};
export default PopupClass;
