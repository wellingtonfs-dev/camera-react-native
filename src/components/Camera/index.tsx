import React, { useRef, useState, useEffect } from 'react';
import { Button, Text, TouchableOpacity, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { CameraView, CameraType, useCameraPermissions} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { styles } from './styles';
import {FontAwesome5} from '@expo/vector-icons'

// Tipagem dos álbuns e assets do MediaLibrary
type Album = MediaLibrary.Album;
type Asset = MediaLibrary.Asset;

export default function CameraComponent() {
  const [cameraType, setCameraType] = useState<CameraType>('back'); 
  const [permission, requestPermission] = useCameraPermissions();
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [showAlbums, setShowAlbums] = useState<boolean>(false);
  const [permissionResponse, requestPermissionMedia] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState<string | null>(null); 
  const cameraRef = useRef<CameraView | null>(null); 

  // Caso a permissão ainda não tenha sido processada
  if (!permission) {
    return <View />;
  }

  // Caso a permissão da câmera não tenha sido concedida
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Função para buscar os álbuns de mídia do dispositivo
  async function getAlbums() {
    if (permissionResponse?.status !== 'granted') {
      await requestPermissionMedia();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
    setShowAlbums(true); // Exibe a lista de álbuns
  }

  // Alternar entre a câmera frontal e traseira
  function toggleCameraType() {
    setCameraType(current => 
      current === 'back' ? 'front' : 'back'
    );
  }

  // Capturar uma foto usando a câmera
  async function takePicture() {
    const options = {quality: 1 }
    if (cameraRef && cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync(options); 
        setPhoto(photoData.uri); // Mostra a foto capturada na tela

        // Salva a foto no álbum automaticamente
        const asset = await MediaLibrary.createAssetAsync(photoData.uri);
        console.log('Foto salva no álbum:', asset);
        
      } catch (error) {
        console.log('Erro ao tirar foto:', error);
      }
    }
  }

  // Voltar para a câmera (após visualizar a foto)
  function retakePicture() {
    setPhoto(null); // Reseta o estado da foto para voltar à câmera
  }

  // Fechar a lista de álbuns e voltar à câmera
  function closeAlbums() {
    setShowAlbums(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão para acessar os álbuns */}
      <View style={styles.header}>
        {!showAlbums && (
          <Button onPress={getAlbums} title="Get Albums" />
        )}
      </View>

      {showAlbums ? (
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {albums && albums.map((album) => (
              <AlbumEntry album={album} key={album.id} />
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.closeButton} onPress={closeAlbums}>
          <FontAwesome5 name='times' size={30} color='#fc0404'/>
          </TouchableOpacity>
        </>
      ) : photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.image} />
          <TouchableOpacity onPress={retakePicture}>
          <FontAwesome5 name='times' size={40} color='#fff'/>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView 
          ref={cameraRef} 
          style={styles.camera} 
          facing={cameraType} 
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity  onPress={toggleCameraType}>
            <FontAwesome5 name='sync' size={30} color='#fff'/>
            </TouchableOpacity>

            <TouchableOpacity  onPress={takePicture}>
            <FontAwesome5 name='camera' size={30} color='#fff'/>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </SafeAreaView>
  );
}

type AlbumEntryProps = {
  album: Album;
};

function AlbumEntry({ album }: AlbumEntryProps) {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? 'no'} assets
      </Text>

      <View style={styles.albumAssetsContainer}>
        {assets && assets.map((asset) => (
          <Image 
            key={asset.id} 
            source={{ uri: asset.uri }} 
            style={styles.albumAsset} 
          />
        ))}
      </View>
    </View>
  );
}
