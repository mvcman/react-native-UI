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

  const [preferences, setPreferences] = useState('');
  const [jobName, setJobName] = useState('');
  const [jobDescription, setJobDesctiption] = useState('');
  const [salary, setSalary] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [error, setError] = useState('');
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
      setError('Job Name cannot be empty');
    } else if (jobDescription === '') {
      setError('Job Description cannot be empty');
    } else if (preferences === '') {
      setError('Preferences cannot be empty');
    } else if (salary === '') {
      setError('salary cannot be empty');
    } else if (companyName === '') {
      setError('Company Name cannot be empty');
    } else if (companyDescription === '') {
      setError('Company Description cannot be empty');
    } else {
      setLoading(true);

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
        setError('');
        navigation.navigate('viewPostedJobs');
      } else {
        setError('unable to update please try again');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'position' : 'height'}
      style={styles.container}
      enabled={focus}
    >
      {/* <Text style={{ fontSize: 26, marginTop: 20, marginBottom: 20 }}>Enter Job details to post</Text> */}
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ color: 'red', fontSize: 15 }}>{error}</Text>
      </View>
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
      <View style={styles.action}>
        <FontAwesome name="calendar" color={theme.secondary} size={20} style={{ bottom: 12 }} />
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={styles.textInput}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker testID="dateTimePicker" value={date} mode={mode} display="calendar" onChange={onChange} />
        )}
      </View>
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

      <TouchableOpacity style={styles.commandButton} onPress={() => handleSubmit()}>
        <Text style={styles.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </KeyboardAvoidingView>
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
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    left: '1%',
    width: '90%',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
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
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Enter JobDetails To Post" component={CreateJob} />
    </Stack.Navigator>
  );
};

export default CreateJobStack;
