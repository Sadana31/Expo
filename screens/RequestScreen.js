import DropdownMenu from 'react-native-dropdown-menu';
import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert} from 'react-native';
    import db from '../config'
import {Header} from 'react-native-elements';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            name: "",
            info: ""
        };
    }

    addRequest=()=>{
        db.collection("requests").add({
            "Item type": this.state.type,
            "Name of item": this.state.name,
            "Extra info": this.state.info
        })
        Alert.alert("Request made successfully!")

        
    }

    render() {
    var data = [["Select the type of the item", "Food" , "Clothes"]];
    return (
    <KeyboardAvoidingView style={{flex: 1, backgroundColor:"#dff5f7"}}>
        <Header 
            centerComponent={{text: "Request Screen", 
            style:{fontWeight: "bold", fontSize: 20, color: "white"}}}
            backgroundColor="#0080ff"
            navigation={this.props.navigation}/>

            <Text style={{marginTop: 20, textAlign: "center"}}>
                You can request for food or clothes in this page...
            </Text>
    

        <View style={{flex:1 , alignItems:"center", marginTop: 230}}>
            <TextInput style={styles.input} placeholder="Enter name of item"
            maxLength={15}
            onChangeText={(text)=>{
                this.setState({name: text})
            }}/>
                
            <TextInput style={[styles.input,{height:"90%", marginTop: 50}]} 
            placeholder="Enter name of item"
            maxLength={35}
            onChangeText={(text)=>{
                this.setState({info: text})
            }}/>
        </View>

        <View style={{marginTop: -70}} />
        <DropdownMenu
        style={{flex: 0.5, fontSize: 17}}
        bgColor={'#66b2ff'}
        tintColor={'#000000'}
        activityTintColor={'red'}
        fontSize={20}
        handler={(selection, row) => this.setState({type: data[selection][row]})}
        data={data}
        >
            <Text style={{marginTop: 20, textAlign: "center"}}>
                You have requested for {this.state.type}
            </Text>
        </DropdownMenu>

        <TouchableOpacity style={styles.button}
                 onPress={()=>{
                     this.addRequest()
                     this.setState({
                        type: '',
                        name: "",
                        info: ""
                    })
                }}>
            <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>

    </KeyboardAvoidingView>
    );
    }
}

const styles = StyleSheet.create({
    input: {
        marginTop: -190,
        width: "80%",
        height: "25%",
        borderWidth: 2,
        textAlign: "center",
        borderRadius: 15,
        fontSize: 18
    },
    button: {
        backgroundColor: "#0080ff",
        borderRadius: 10,
        width: 200,
        height: "5%",
        marginTop: -90,
        alignSelf: "center",
        marginBottom: 80
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        marginTop: 5
    },
})