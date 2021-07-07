/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  ToastAndroid,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { addJobMutation } from '../components/db-functions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../components/context';
import { theme } from '../components/ThemeColor';

const Stack = createStackNavigator();

const CreateJob = ({ navigation }) => {
  const colors = {
    text: 'black',
  };

  const [data, setData] = useState({
    isName: false,
    isDescription: false,
    isPreference: false,
    isSalary: false,
    isCompany: false,
    isCDescription: false,
    isDate: false,
    error: '',
  });
  const [preferences, setPreferences] = useState('');
  const [jobName, setJobName] = useState('');
  const [jobDescription, setJobDesctiption] = useState('');
  const [salary, setSalary] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const { user } = React.useContext(AuthContext);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleSubmit = async () => {
    console.log(date);
    console.log(salary);
    if (jobName === '') {
      // setError('Job Name cannot be empty');
      setData({
        isName: true,
        isDescription: false,
        isPreference: false,
        isSalary: false,
        isCompany: false,
        isCDescription: false,
        isDate: false,
        error: 'Job Name cannot be empty',
      });
    } else if (jobDescription === '') {
      // setError('Job Description cannot be empty');
      setData({
        isName: false,
        isDescription: true,
        isPreference: false,
        isSalary: false,
        isCompany: false,
        isCDescription: false,
        isDate: false,
        error: 'Job Description cannot be empty',
      });
    } else if (preferences === '') {
      // setError('Preferences cannot be empty');
      setData({
        isName: false,
        isDescription: false,
        isPreference: true,
        isSalary: false,
        isCompany: false,
        isCDescription: false,
        isDate: false,
        error: 'Preferences cannot be empty',
      });
    } else if (salary === '') {
      // setError('salary cannot be empty');
      setData({
        isName: false,
        isDescription: false,
        isPreference: false,
        isSalary: true,
        isCompany: false,
        isCDescription: false,
        isDate: false,
        error: 'salary cannot be empty',
      });
    } else if (companyName === '') {
      // setError('Company Name cannot be empty');
      setData({
        isName: false,
        isDescription: false,
        isPreference: false,
        isSalary: false,
        isCompany: true,
        isCDescription: false,
        isDate: false,
        error: 'Company Name cannot be empty',
      });
    } else if (companyDescription === '') {
      // setError('Company Description cannot be empty');
      setData({
        isName: false,
        isDescription: false,
        isPreference: false,
        isSalary: false,
        isCompany: false,
        isCDescription: true,
        isDate: false,
        error: 'Company Description cannot be empty',
      });
    } else {
      setLoading(true);
      setData({
        isName: false,
        isDescription: false,
        isPreference: false,
        isSalary: false,
        isCompany: false,
        isCDescription: false,
        isDate: false,
        error: '',
      });

      const data = await addJobMutation(
        user.userId,
        jobName,
        jobDescription,
        preferences,
        date,
        salary,
        companyName,
        companyDescription,
      );
      console.log(data);
      if (data.insert_Job.affected_rows === 1) {
        setLoading(false);
        setJobDesctiption('');
        setJobName('');
        setPreferences('');
        setSalary('');
        setDate(new Date());
        setSalary('');
        setCompanyName('');
        setCompanyDescription('');
        ToastAndroid.show('Job has been posted successfully', ToastAndroid.SHORT);
        // setError('');
        // navigation.navigate('viewPostedJobs');
      } else {
        Alert.alert('Form Error!', 'Unable to update data');
      }
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'position' : 'height'}
        style={styles.container}
        enabled={focus}
      >
        {/* <Text style={{ fontSize: 26, marginTop: 20, marginBottom: 20 }}>Enter Job details to post</Text> */}
        {/* <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: 'red', fontSize: 14, marginBottom: 5 }}>{error}</Text>
        </View> */}
        <View style={styles.witherror}>
          <View style={styles.action}>
            <FontAwesome name="file" color={theme.secondary} size={20} />
            <TextInput
              placeholder="Job name"
              placeholderTextColor="grey"
              autoCorrect={false}
              onFocus={() => setFocus(false)}
              value={jobName}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={setJobName}
            />
          </View>
          {data.isName ? (
            <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{data.error}</Text>
          ) : null}
        </View>

        <View style={styles.witherror}>
          <View style={styles.action}>
            <FontAwesome name="comment" color={theme.secondary} size={20} />
            <TextInput
              placeholder="Job Description"
              placeholderTextColor="grey"
              autoCorrect={false}
              onFocus={() => setFocus(false)}
              value={jobDescription}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={setJobDesctiption}
            />
          </View>
          {data.isDescription ? (
            <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{data.error}</Text>
          ) : null}
        </View>

        <View style={styles.witherror}>
          <View style={styles.action}>
            <FontAwesome name="star" color={theme.secondary} size={20} />
            <TextInput
              placeholder='Enter preferences separated by " , "'
              placeholderTextColor="#666666"
              value={preferences}
              autoCorrect={false}
              onFocus={() => setFocus(false)}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={setPreferences}
            />
          </View>
          {data.isPreference ? (
            <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{data.error}</Text>
          ) : null}
        </View>

        <View style={styles.witherror}>
          <View style={styles.action}>
            <FontAwesome name="calendar" color={theme.secondary} size={20} style={{ bottom: 12 }} />
            <TouchableOpacity onPress={showDatepicker}>
              <Text style={styles.textInput}>{date.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {show && (
              <DateTimePicker testID="dateTimePicker" value={date} mode={mode} display="calendar" onChange={onChange} />
            )}
          </View>
          {data.isDate ? (
            <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{data.error}</Text>
          ) : null}
        </View>

        <View style={styles.witherror}>
          <View style={styles.action}>
            <FontAwesome name="money" color={theme.secondary} size={20} />
            <TextInput
              placeholder="Salary"
              placeholderTextColor="grey"
              keyboardType="numeric"
              autoCorrect={false}
              onFocus={() => setFocus(true)}
              value={salary}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={setSalary}
            />
          </View>
          {data.isSalary ? (
            <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{data.error}</Text>
          ) : null}
        </View>

        <View style={styles.witherror}>
          <View style={styles.action}>
            <FontAwesome name="info-circle" color={theme.secondary} size={20} />
            <TextInput
              placeholder="Company Name"
              placeholderTextColor="grey"
              autoCorrect={false}
              value={companyName}
              onFocus={() => setFocus(true)}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={setCompanyName}
            />
          </View>
          {data.isCompany ? (
            <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{data.error}</Text>
          ) : null}
        </View>

        <View style={styles.witherror}>
          <View style={styles.action}>
            <FontAwesome name="info-circle" color={theme.secondary} size={20} />
            <TextInput
              placeholder="Company Details"
              value={companyDescription}
              placeholderTextColor="grey"
              autoCorrect={false}
              onFocus={() => setFocus(true)}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              onChangeText={setCompanyDescription}
            />
          </View>
          {data.isCDescription ? (
            <Text style={{ color: 'red', fontSize: 14, marginBottom: 5, marginLeft: 20 }}>{data.error}</Text>
          ) : null}
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={() => handleSubmit()}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="blue" />
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    // textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  commandButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: theme.primary,
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'blue',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    color: 'white',
  },
  witherror: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    marginBottom: 5,
  },
  action: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingHorizontal: 10,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    // eslint-disable-next-line no-undef
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 15,
    color: '#05375a',
    fontFamily: 'Roboto-Regular',
  },
  dateButton: {
    backgroundColor: 'red',
    width: '10%',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    // backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CreateJobStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.primary,
        },
        headerTintColor: theme.textLight,
        headerTitleStyle: {
          // fontWeight: 'bold',
          fontFamily: 'Roboto-Bold',
        },
      }}
    >
      <Stack.Screen name="Enter Job Details To Post" component={CreateJob} />
    </Stack.Navigator>
  );
};

export default CreateJobStack;
