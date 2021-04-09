import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ScrollView} from 'react-native';
import { ListItem, Header } from 'react-native-elements'
import firebase from 'firebase';
import {RFValue} from 'react-native-responsive-fontsize';
import db from '../config'

export default class DonateScreen extends React.Component {
    constructor(){
        super()
        this.state = {
          requestedItemsList : []
        }
      this.requestRef= null
    }

    getRequestedItemList =()=>{
        db.collection("requests")
        .onSnapshot((snapshot)=>{
          var requestedItemList = snapshot.docs.map(document => document.data());
          this.setState({
            requestedItemsList : requestedItemList
          });
        })
      }
    
    componentDidMount(){
        this.getRequestedItemList()
    }

    renderItem = ( {item, i} ) =>{
        return (
          <ListItem
            key={i}
            title={item.name}
            subtitle={"Type: " + item.type}
            titleStyle={{ color: 'black', fontWeight: 'bold', fontSize: RFValue(20) }}
            subtitleStyle={{ color: 'black', fontSize: RFValue(15) }}
            rightElement={
                <TouchableOpacity style={styles.button}
                onPress={()=>{
                  this.props.navigation.navigate("ReceiverDetailsScreen",{"details":item});
                }}>
                  <Text style={{color:'#ffff', fontWeight: "bold"}}>VIEW  </Text>
                </TouchableOpacity>
              }
            bottomDivider
          />
        )
    }
    
    keyExtractor = (item, index) => index.toString()

    render(){
        return (
            <View>
                <Header 
                centerComponent={{text: "Donate Screen", 
                style:{fontWeight: "bold", fontSize: 20, color: "white"}}}
                backgroundColor="#0080ff"
                navigation={this.props.navigation}/>

                <View style={{flex:1, backgroundColor: "lightblue"}}>
                    {
                        this.state.requestedItemsList.length === 0
                        ?(
                        <View style={styles.subContainer}>
                            <Text style={{ fontSize: RFValue(20)}}>List Of All Requested Items</Text>
                        </View>
                        )
                        :(
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.requestedItemsList}
                            renderItem={this.renderItem}
                        />
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: RFValue(20),
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: "lightblue"
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"blue",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
})
