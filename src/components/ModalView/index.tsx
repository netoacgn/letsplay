import React, { ReactNode } from 'react';
import { View, Modal, ModalProps, TouchableWithoutFeedback } from 'react-native';
import { Background } from '../Background';

import { styles } from './styles';

type Props = ModalProps & {
    children: ReactNode;
    closeModal: () => void;
}


export function ModalView({ children, closeModal, ...rest }: Props) {
    const uri = 'https://cdn.icon-icons.com/icons2/2224/PNG/512/discord_logo_icon_134445.png'

    return (
        <Modal
            transparent
            animationType='slide'
            statusBarTranslucent
            {...rest}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <Background>
                            <View style={styles.bar} />
                            {children}
                        </Background>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>


    );
}
