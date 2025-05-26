import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { chatStyles as styles } from "./chat.styles"
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { groupMessagesByDate, simulatedMessages } from './utils';

export type ChatMessage = {
  message: string;
  owner: string;
  date: string;
}
type ChatProps = {
  messages: ChatMessage[],
  userId: string
}


const MESSAGES_PER_LOAD = 20;

// Simula mensagens
const generateFakeMessages = (count = 100) => {
  const messages = [];
  const userIds = ['user1', 'user2'];
  const sampleTexts = [
    'E aí?', 'Tudo certo?', 'Tranquilo!', 'React Native é bom!',
    'Testando o chat', 'Bora codar?', 'Deploy feito', 'Tô online',
    'Chama no zap', 'Haha boa!', 'VS Code ou WebStorm?', 'Partiu café ☕',
    'Live hoje?', 'Animação top', 'Reanimated ou Layout?', 'A call tá on?',
  ];

  const baseDate = moment();

  for (let i = 0; i < count; i++) {
    const owner = userIds[i % 2];
    const message = sampleTexts[i % sampleTexts.length];

    // Distribuir mensagens em dias passados, variando hora e minutos
    const date = baseDate
      .clone()
      .subtract(Math.floor(i / 15), 'days') // a cada 15 mensagens volta 1 dia
      .set({
        hour: 10 + (i % 5), // das 10h às 14h
        minute: (i * 7) % 60,
        second: 0,
        millisecond: 0,
      })
      .toISOString();

    messages.unshift({ message, owner, date });
  }

  return messages;
};

const generateSimulatedMessages = () => {
  const baseDate = moment();
  const msgs = [];
  let counter = 0;
  const owners = ['user1', 'user2'];

  // Gera 50 mensagens em 7 dias variados
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const messagesPerDay = Math.floor(Math.random() * 10) + 3; // 3 a 12 msgs/dia
    for (let i = 0; i < messagesPerDay; i++) {
      const date = baseDate
        .clone()
        .subtract(dayOffset, 'days')
        .set({ hour: 9 + Math.floor(i / 2), minute: (i * 7) % 60, second: 0 });

      msgs.push({
        message: `Mensagem ${counter + 1}`,
        owner: owners[counter % 2],
        date: date.toISOString(),
      });
      counter++;
      if (counter >= 50) break;
    }
    if (counter >= 50) break;
  }

  // Ordena mais recentes primeiro
  return msgs.sort((a, b) => moment(b.date).diff(moment(a.date)));
};

const allMessages = generateFakeMessages(100);

const Chat: FC<ChatProps> = ({ messages, userId }) => {
  const [visibleMessages, setVisibleMessages] = useState<any>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [animValues, setAnimValues] = useState<any>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<any>(null);

  // Habilita animação no Android
  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  // Carrega mensagens iniciais
  useEffect(() => {
    loadMoreMessages(true);
  }, []);

  const loadMoreMessages = (initial = false) => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const newCount = loadedCount + MESSAGES_PER_LOAD;
      const newMessages = allMessages.slice(0, newCount);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      const addedCount = newMessages.length - visibleMessages.length;
      const newAnims = Array(addedCount)
        .fill(0)
        .map(() => {
          const a = new Animated.Value(0);
          Animated.timing(a, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
          return a;
        });

      setVisibleMessages(newMessages);
      setAnimValues([...newAnims, ...animValues]);
      setLoadedCount(newCount);
      setLoading(false);
    }, 300);
  };

  // Scroll automático
  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Enviar mensagem
  const handleSend = () => {
    if (input.trim().length === 0) return;

    const now = moment();


    const newMessage = {
      message: input.trim(),
      owner: userId,
      date: now.toISOString(),
    };

    const newAnim = new Animated.Value(0);
    setVisibleMessages((prev: any) => [newMessage, ...prev]);
    setAnimValues((prev: any) => [newAnim, ...prev]);
    setInput('');
    Keyboard.dismiss();

    Animated.timing(newAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => scrollToBottom());
  };

  const renderItem = ({ item, index }: any) => {
    if (item.type === 'header') {
    return (
      <View style={styles.dateHeaderContainer}>
        <Text style={styles.dateHeaderText}>{item.date}</Text>
      </View>
    );
  }
  const isOwn = item.owner === userId;
  const animatedValue = animValues[index];

  if (!animatedValue) {
    return null; // garante que não renderize incorretamente
  }

  return (
    <Animated.View
      style={{
        opacity: animatedValue,
        transform: [
          {
            translateY: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }}
    >
      <View
        style={[
          styles.messageContainer,
          isOwn ? styles.messageRight : styles.messageLeft,
        ]}
      >
        <View
          style={[
            styles.messageCard,
            isOwn ? styles.ownCard : styles.otherCard,
          ]}
        >
          <Text style={styles[isOwn ? 'messageText' : 'leftMessageText']}>{item.message}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </View>
    </Animated.View>
  )};

  const groupedData = groupMessagesByDate(simulatedMessages);

  return (
    <>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <FlatList
        ref={flatListRef}
        data={groupedData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
        inverted
        onEndReached={loadMoreMessages as any}
        onEndReachedThreshold={0.2}
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
        keyboardShouldPersistTaps="handled"
      />
    </KeyboardAvoidingView>

    <View style={styles.footer}>
       <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
             value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.buttonSend}  onPress={handleSend}>
            <FontAwesome name="send" size={18} color="white" />
          </TouchableOpacity>
       </View>
      </View>
    </>
  );
};


export default Chat;


/*
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import { chatStyles as styles } from "./chat.styles"
import { FontAwesome } from '@expo/vector-icons';

moment.locale('pt-br');

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MESSAGES_PER_LOAD = 15;
const userId = 'user1';

const generateFakeMessages = (count = 100) => {
  const messages = [];
  const userIds = ['user1', 'user2'];
  const sampleTexts = [
    'E aí?', 'Tudo certo?', 'Tranquilo!', 'React Native é bom!',
    'Testando o chat', 'Bora codar?', 'Deploy feito', 'Tô online',
    'Chama no zap', 'Haha boa!', 'VS Code ou WebStorm?', 'Partiu café ☕',
    'Live hoje?', 'Animação top', 'Reanimated ou Layout?', 'A call tá on?',
  ];

  const baseDate = moment();

  for (let i = 0; i < count; i++) {
    const owner = userIds[i % 2];
    const message = sampleTexts[i % sampleTexts.length];
    const date = baseDate
      .clone()
      .subtract(Math.floor(i / 15), 'days')
      .set({
        hour: 10 + (i % 5),
        minute: (i * 7) % 60,
        second: 0,
        millisecond: 0,
      })
      .toISOString();

    messages.unshift({ message, owner, date });
  }

  return messages;
};

const formatDateLabel = (dateString) => {
  const date = moment(dateString, 'YYYY-MM-DD');
  const today = moment();
  const yesterday = moment().subtract(1, 'day');

  if (date.isSame(today, 'day')) return 'Hoje';
  if (date.isSame(yesterday, 'day')) return 'Ontem';
  return date.format('D [de] MMMM [de] YYYY');
};

const groupMessagesByDate = (messages) => {
  const groups = {};

  messages.forEach((msg) => {
    const dateKey = moment(msg.date).format('YYYY-MM-DD');
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(msg);
  });

  const result = [];

  Object.keys(groups)
    .sort((a, b) => moment(b).diff(moment(a)))
    .forEach((dateKey) => {
      result.push({
        type: 'header',
        date: formatDateLabel(dateKey),
        key: `header-${dateKey}`,
      });

      groups[dateKey].forEach((msg) => {
        result.push({
          ...msg,
          type: 'message',
          key: `msg-${msg.id}`, // chave única e estável
        });
      });
    });

  return result;
}

export default function ChatScreen() {
  const allMessages = useRef(generateFakeMessages(50)).current;

  const [loadedCount, setLoadedCount] = useState(MESSAGES_PER_LOAD);
  const [visibleMessages, setVisibleMessages] = useState(
    allMessages.slice(0, MESSAGES_PER_LOAD),
  );
  const flatListRef = useRef(null);
  const loadingRef = useRef(false);

  const [input, setInput] = useState('');

  const groupedData = groupMessagesByDate(visibleMessages);

  // Guarda Animated.Value por key do item
  const animValuesRef = useRef({});

  // Cria Animated.Value para itens novos, retorna o animatedValue para o key
  const getAnimValue = (key) => {
    if (!animValuesRef.current[key]) {
      animValuesRef.current[key] = new Animated.Value(0);
      Animated.timing(animValuesRef.current[key], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
    return animValuesRef.current[key];
  };

  const loadMoreMessages = () => {
    if (loadingRef.current) return;
    if (loadedCount >= allMessages.length) return;

    loadingRef.current = true;

    setTimeout(() => {
      const newCount = Math.min(loadedCount + MESSAGES_PER_LOAD, allMessages.length);
      const newMessages = allMessages.slice(0, newCount);

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      setVisibleMessages(newMessages);
      setLoadedCount(newCount);

      loadingRef.current = false;
    }, 300);
  };

  const [lastId, setLastId] = useState(allMessages.length);

  const handleSend = () => {
  if (!input.trim()) return;

  const now = moment().toISOString();
  const newId = lastId + 1;

  const newMessage = {
    id: newId,
    message: input.trim(),
    owner: userId,
    date: now,
  };

  setVisibleMessages((prev) => [newMessage, ...prev]);
  setLastId(newId);
  setInput('');
  Keyboard.dismiss();

  setTimeout(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, 50);
};

  const renderItem = ({ item }) => {
    if (item.type === 'header') {
      return (
        <View style={styles.dateHeaderContainer}>
          <Text style={styles.dateHeaderText}>{item.date}</Text>
        </View>
      );
    }

    const isOwn = item.owner === userId;
    const animatedValue = getAnimValue(item.key);

    return (
      <Animated.View
        style={{
          opacity: animatedValue,
          transform: [
            {
              translateY: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <View
          style={[
            styles.messageContainer,
            isOwn ? styles.messageRight : styles.messageLeft,
          ]}
        >
          <View
            style={[styles.messageCard, isOwn ? styles.ownCard : styles.otherCard]}
          >
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.dateText}>{moment(item.date).format('HH:mm')}</Text>
          </View>
        </View>
      </Animated.View>
    );
  };

    return (
    <>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <FlatList
        ref={flatListRef}
        data={groupedData}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        inverted
        contentContainerStyle={[styles.listContainer, { flexGrow: 1, justifyContent: 'flex-end' }]}
        onEndReached={loadMoreMessages}
        onEndReachedThreshold={0.2}
      />
    </KeyboardAvoidingView>

    <View style={styles.footer}>
       <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
             value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.buttonSend}  onPress={handleSend}>
            <FontAwesome name="send" size={18} color="white" />
          </TouchableOpacity>
       </View>
      </View>
    </>
  );
}


*/
