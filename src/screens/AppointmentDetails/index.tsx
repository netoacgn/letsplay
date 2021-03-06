import React, { useState, useEffect } from 'react'
import { ImageBackground, Text, View, FlatList, Alert, Share, Platform } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

import { AppointmentProps } from '../../components/Appointment';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Header } from '../../components/Header';
import { Load } from '../../components/Load';
import { styles } from './styles';

import { theme } from '../../global/styles/theme';
import BannerImg from '../../assets/banner.png';
import { api } from '../../services/api';

type Params = {
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invited: string;
    members: MemberProps[];
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { guildSelected } = route.params as Params;

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
            setLoading(false);

        } catch {
            Alert.alert('Verifique as configurações do servidor. Será que o Widget está habilitado?');
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation() {
        const message = Platform.OS === 'ios' ?
            `Junte-se a ${guildSelected.guild.name}`
            : widget.instant_invited;

        Share.share({
            message,
            url: widget.instant_invited,
        });
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invited);
    }

    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return (
        <Background>
            <Header
                title='Detalhes'
                action={
                    guildSelected.guild.owner &&
                    <BorderlessButton onPress={handleShareInvitation}>
                        <Fontisto
                            name='share'
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />

            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {guildSelected.guild.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            {
                loading ? <Load /> :
                    <>
                        <ListHeader
                            title='Jogadores'
                            subtitle={`Total ${widget.members.length}`}
                        />

                        <FlatList
                            data={widget.members}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <Member data={item} />
                            )}
                            ItemSeparatorComponent={() => <ListDivider isCentered />}
                            style={styles.members}
                        />

                        {
                            guildSelected.guild.owner &&
                            <View style={styles.footer}>
                                <ButtonIcon
                                    onPress={handleOpenGuild}
                                    title='Entrar na partida'
                                />
                            </View>
                        }
                    </>
            }
        </Background>
    )
}
