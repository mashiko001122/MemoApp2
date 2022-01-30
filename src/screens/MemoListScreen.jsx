import React, {useEffect,useState} from 'react';
import {StyleSheet,View,Alert,Text} from 'react-native';

import firebase from 'firebase';

import MemoList from '../components/MemoList';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default function MemoListScreen(props){
    const { navigation } = props;
    const [memos, setMemos] = useState([]);
    const [isRoading, setRoading] = useState(false);

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => <LogOutButton />,
      });
    },[])

    useEffect(() => {
      const db = firebase.firestore();
      const { currentUser } = firebase.auth();

      let unsubscribe = () => {};
      if (currentUser){
        setRoading(true);
        const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy('updatedAt','desc');
        unsubscribe = ref.onSnapshot((snapshot) => {
        const userMemos = [];
        snapshot.forEach((doc) => {
          console.log(doc.id,doc.data());
          const data = doc.data();
          userMemos.push({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
          });
        });
          setMemos(userMemos);
          setRoading(false);
        },(error) => {
          console.log(error);
          setRoading(false);
          Alert.alert('データの読み込みに失敗しました。');
        });
      }
      return unsubscribe;
    }, []);

    if (memos.length === 0){
      return (
        <View style={emptyStyles.container}>
           <Loading isRoading={isRoading} />
          <View style={emptyStyles.inner}>
            <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
            <Button
              style={emptyStyles.button}
              label="作成する"
              onPress={()=>{navigation.navigate('MemoCreate');}}>
            </Button>
          </View>
        </View>
      )
    }
    return (
     <View style={styles.container}>

      <MemoList memos={memos} />
      <CircleButton
        name="plus"
        onPress = {() => {navigation.navigate('MemoCreate'); }}
      />
     </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
});

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
  },
})
