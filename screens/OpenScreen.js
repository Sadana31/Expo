import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class OpenScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      email: '',
      phoneNumber: '',
      getPass: '',
      modalVisible: false,
      confirmPassword: '',
      address: '',
    };
  }

  signUp = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert('Passwords do not match');
    } else {
      db.collection('users').add({
        userName: this.state.userName,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        address: this.state.address,
      });
      return Alert.alert('User Added Successfully', '', [
        { text: 'OK', onPress: () => this.setState({ modalVisible: false }) },
      ]);
    }
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{ width: '100%' }}>
            <KeyboardAvoidingView
              style={styles.KeyboardAvoidingView}
              behavior="margin"
              enabled>
              <Text style={styles.modalTitle}>Sign Up here!!</Text>

              <TextInput
                style={styles.formInput}
                placeholder={'User Name'}
                maxLength={8}
                onChangeText={(text) => {
                  this.setState({
                    userName: text,
                  });
                }}
              />
              <TextInput
                style={styles.formInput}
                placeholder={'Phone number'}
                maxLength={10}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  this.setState({
                    phoneNumber: text,
                  });
                }}
              />
              <TextInput
                style={styles.formInput}
                placeholder={'Address'}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    address: text,
                  });
                }}
              />
              <TextInput
                style={styles.formInput}
                placeholder={'Email'}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                  this.setState({
                    email: text,
                  });
                }}
              />
              <TextInput
                style={styles.formInput}
                placeholder={'Password'}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TextInput
                style={styles.formInput}
                placeholder={'Confirm Password'}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              />
              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    if (
                      this.state.userName === '' ||
                      this.state.lastName === '' ||
                      this.state.phoneNumber === '' ||
                      this.state.address === '' ||
                      this.state.email === '' ||
                      this.state.password === '' ||
                      this.state.confirmPassword === ''
                    ) {
                      console.log('Check');
                      return Alert.alert('Please fill in all the details!!');
                    } else {
                      this.signUp(
                        this.state.email,
                        this.state.password,
                        this.state.confirmPassword
                      );
                    }
                  }}>
                  <Text style={[styles.registerButtonText, { fontSize: 18 }]}>
                    REGISTER{' '}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalBackButton}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}>
                  <Text style={styles.registerButtonText}>CANCEL </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: 'center', backgroundColor: '#dff5f7' }}
        behavior="margin"
        enabled>
        <Header
          centerComponent={{
            text: 'MC Donor',
            style: { fontWeight: 'bold', fontSize: 20, color: 'white' },
          }}
          backgroundColor="#0080ff"
          // navigation={this.props.navigation}
        />

        {this.showModal()}

        <View
          style={{
            borderWidth: 1,
            marginTop: 20,
            borderRadius: 35,
            borderColor: 'darkblue',
            padding: 20,
          }}>
          <Text style={styles.head}>Welcome to FC DONOR: </Text>
          <Text style={styles.head}>an app where you can donate</Text>
          <Text style={styles.head}>food & clothes!! </Text>
        </View>

        <View style={{ alignItems: 'center', flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Enter your User Name"
            onChangeText={(text) => {
              this.setState({ userName: text });
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("DonateScreen");
            }}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>

          <Text style={[styles.head, { marginTop: 20 }]}>
            Don't have an account? Sign up
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({ modalVisible: true })}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0080ff',
    borderRadius: 10,
    width: 200,
    margin: 10,
    height: '7%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 23,
    marginTop: 5,
  },
  head: {
    margin: 5,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#3750F3',
  },
  input: {
    width: 300,
    height: '8%',
    borderBottomWidth: 2,
    backgroundColor: '#dff5f7',
    fontSize: 20,
    margin: 20,
    paddingLeft: 10,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 15,
  },
  formInput: {
    width: '75%',
    height: '7%',
    alignSelf: 'center',
    borderColor: '#000099',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: 20,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccffff',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  registerButton: {
    width: 180,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: 'center',
  },
  registerButtonText: {
    color: '#ff5722',
    //fontSize: RFValue(15),
    fontWeight: 'bold',
  },
  modalTitle: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    color: '#000066',
    margin: 15,
    fontWeight: 'bold',
  },
});
