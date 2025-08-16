import ThemedCard from '@/presentation/shared/ThemedCard';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedTextInput from '@/presentation/shared/ThemedTextInput';
import ThemedView from '@/presentation/shared/ThemedView';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const isIOS = Platform.OS === 'ios';
const TextInputsScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'height' : undefined}>
      <ScrollView>
        <ThemedView margin>
          <ThemedCard className='mb-5'>
            <ThemedTextInput
              placeholder='Nombre completo'
              autoCapitalize={'words'}
              autoCorrect={false}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />

            <ThemedTextInput
              placeholder='Correo electrónico'
              autoCorrect={false}
              keyboardType='email-address'
              onChangeText={(text) => setForm({ ...form, email: text })}
            />

            <ThemedTextInput
              placeholder='Teléfono'
              autoCorrect={false}
              keyboardType='phone-pad'
              onChangeText={(text) => setForm({ ...form, phone: text })}
            />
          </ThemedCard>

          <ThemedText>
            Following cards showed for testing input-keyboard interaction purposes
          </ThemedText>

          <ThemedCard className='my-2'>
            <ThemedText>
              {JSON.stringify(form, null, 2)}
            </ThemedText>
          </ThemedCard>

          <ThemedCard className='my-2'>
            <ThemedText>
              {JSON.stringify(form, null, 2)}
            </ThemedText>
          </ThemedCard>

          <ThemedCard className='my-2'>
            <ThemedText>
              {JSON.stringify(form, null, 2)}
            </ThemedText>
          </ThemedCard>

          <ThemedCard className='my-2'>
            <ThemedText>
              {JSON.stringify(form, null, 2)}
            </ThemedText>
          </ThemedCard>

          <ThemedCard className='my-2'>
            <ThemedText>
              {JSON.stringify(form, null, 2)}
            </ThemedText>
          </ThemedCard>

          <ThemedCard className='my-2'>
            <ThemedText>
              {JSON.stringify(form, null, 2)}
            </ThemedText>
          </ThemedCard>

          <ThemedCard className='my-2'>
            <ThemedText>
              {JSON.stringify(form, null, 2)}
            </ThemedText>
          </ThemedCard>

          <ThemedCard className='my-2'
          // style={{
          //   marginBottom: isIOS ? 100 : 10
          // }}
          >
            <ThemedText>
              {JSON.stringify(form, null, 2)}
            </ThemedText>
          </ThemedCard>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>

  );
};
export default TextInputsScreen;
