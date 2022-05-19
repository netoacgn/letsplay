import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    image: {
        width: 62,
        height: 66,
    },
    container: {
        width: 62,
        height: 66,
        borderRadius: 8,
        backgroundColor: theme.colors.discord,
        alignContent: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    }

})