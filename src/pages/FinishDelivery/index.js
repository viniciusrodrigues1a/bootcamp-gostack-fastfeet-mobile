import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import ColoredContainer from '~/components/ColoredContainer';

import {
  CameraView,
  CameraButtonsContainer,
  CameraButton,
  SendButton,
  SendButtonText,
} from './styles';

export default function FinishDelivery({ route, navigation }) {
  const { id } = route.params;
  const isFocused = useIsFocused();

  const [filePath, setFilePath] = useState('');
  const [loading, setLoading] = useState(false);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [cameraTypeIconName, setCameraTypeIconName] = useState('camera-rear');
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.auto);
  const [flashIconName, setFlashIconName] = useState('flash-auto');

  async function takePicture(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    setFilePath(data.uri);
  }

  async function handleSendPicture() {
    try {
      setLoading(true);

      // eslint-disable-next-line no-undef
      const data = new FormData();

      data.append('file', {
        uri: filePath,
        type: 'image/jpg',
        name: `signature_id_${id}.jpg`,
      });

      const {
        data: { id: signature_id },
      } = await api.post('/files', data);

      await api.put(`/deliveries/finish-delivery/${id}`, {
        end_date: new Date(),
        signature_id,
      });

      Alert.alert('Sucesso', 'Foto enviada!', [
        { text: 'OK', onPress: () => navigation.navigate('Deliveries') },
      ]);
    } catch (err) {
      Alert.alert('Algo deu errado');
    } finally {
      setLoading(false);
    }
  }

  function PendingView() {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: '#f5f5f5',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Aguarde</Text>
      </View>
    );
  }

  function switchFlashMode() {
    const { on } = RNCamera.Constants.FlashMode;
    const { off } = RNCamera.Constants.FlashMode;
    const { auto } = RNCamera.Constants.FlashMode;

    if (flashMode === auto) {
      setFlashMode(on);
      setFlashIconName('flash-on');
    }

    if (flashMode === on) {
      setFlashMode(off);
      setFlashIconName('flash-off');
    }

    if (flashMode === off) {
      setFlashMode(auto);
      setFlashIconName('flash-auto');
    }
  }

  function switchCameraType() {
    const { back } = RNCamera.Constants.Type;
    const { front } = RNCamera.Constants.Type;

    if (cameraType === back) {
      setCameraType(front);
      setCameraTypeIconName('camera-front');
    }

    if (cameraType === front) {
      setCameraType(back);
      setCameraTypeIconName('camera-rear');
    }
  }

  if (isFocused) {
    return (
      <ColoredContainer.Container>
        <ColoredContainer.ContentWrapper>
          <CameraView>
            <RNCamera
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                flex: 1,
              }}
              type={cameraType}
              flashMode={flashMode}
              captureAudio={false}
              androidCameraPermissionOptions={{
                title: 'Permissão para usar câmera',
                message: 'Precisamos da sua permissão para utilizar a câmera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancelar',
              }}
            >
              {({ camera, status, _ }) => {
                if (status !== 'READY') return <PendingView />;
                return (
                  <CameraButtonsContainer>
                    <CameraButton onPress={switchFlashMode}>
                      <Icon name={flashIconName} color="#fff" size={25} />
                    </CameraButton>

                    <CameraButton onPress={() => takePicture(camera)}>
                      <Icon name="camera-alt" color="#fff" size={35} />
                    </CameraButton>

                    <CameraButton onPress={switchCameraType}>
                      <Icon name={cameraTypeIconName} color="#fff" size={25} />
                    </CameraButton>
                  </CameraButtonsContainer>
                );
              }}
            </RNCamera>
          </CameraView>

          <View
            style={{
              backgroundColor: '#fff',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          />

          <SendButton onPress={handleSendPicture}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <SendButtonText>Enviar</SendButtonText>
            )}
          </SendButton>
        </ColoredContainer.ContentWrapper>
      </ColoredContainer.Container>
    );
  }
  return null;
}

FinishDelivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
