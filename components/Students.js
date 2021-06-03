import React from 'react';
import {SafeAreaView, ScrollView, View, TextInput} from 'react-native';
import TagUser from './TagUser';
const Students = props => {
  return (
    <SafeAreaView>
      <View style={{marginBottom: 20}}>
        <TextInput
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: 'black',
            marginHorizontal: 20,
          }}
          placeholder={'Nhập tên hoặc SĐT của học sinh'}
          onChangeText={text => {
            setSearchInput(text);
          }}
        />
      </View>
      <ScrollView style={{backgroundColor: '#fff'}}>
        {searchResult.map((value, index) => (
          <TagUser
            key={index}
            userInfor={value}
            isEdit={false}
            onLongPress={editStudent}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
export default Students;
