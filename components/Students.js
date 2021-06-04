import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import TagUser from './TagUser';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SwipeListView} from 'react-native-swipe-list-view';
const Students = props => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const scrollView = useRef(null);

  useEffect(() => {
    scrollView.current.scrollTo({x: 0, y: 74, animated: true});
    if (searchInput == '') {
      setSearchResult(props.students);
    } else {
      let result = findName(searchInput);
      //console.log(`result`, result);
      setSearchResult(result);
    }
  }, [searchInput]);

  const findName = strSearch => {
    let result = [];
    props.students.forEach(element => {
      if (element.name.includes(strSearch)) {
        result.push(element);
      } else if (element.phoneNumber.includes(strSearch)) {
        result.push(element);
      }
    });
    return result;
  };
  return (
    <View style={{flex: 1}}>
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
      <ScrollView ref={scrollView}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
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
          }}>
          <MaterialIcons
            name={'add-circle-outline'}
            size={50}
            color={'#3399ff'}
            style={{marginVertical: 10}}
          />
        </TouchableOpacity>
        {/* {searchResult.map((value, index) => (
          <TagUser
            key={index}
            userInfor={value}
            isEdit={false}
            onLongPress={() => {}}
          />
        ))} */}
        <SwipeListView
          data={searchResult}
          renderItem={(data, rowMap) => (
            <TagUser
              key={data.index}
              userInfor={data.item}
              isEdit={false}
              onLongPress={() => {}}
            />
          )}
          renderHiddenItem={() => (
            <View>
              <Text>Left</Text>
              <Text>Right</Text>
            </View>
          )}
          leftOpenValue={100}
        />
      </ScrollView>
    </View>
  );
};
export default Students;
