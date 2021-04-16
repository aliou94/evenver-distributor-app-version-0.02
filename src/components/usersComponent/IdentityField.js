import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(1),
        marginTop: -theme.spacing(0.5),
        marginBottom: -theme.spacing(0.5),
    },
}));

const AvatarField = ({ record, size = '25', className }) =>
    record ? (
        <Avatar
            src={`${record.avatar}?size=${size}x${size}`}
            style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
            className={className}
        />
    ) : null;



const FullNameField = ({ record, size }) => {
    const classes = useStyles();
    return record ? (
            <div className={classes.root}>
                <AvatarField
                    className={classes.avatar}
                    record={record}
                    size={size}
                />
                {record.firstName} {record.lastName}
            </div>

    ) : null;
};





FullNameField.defaultProps = {
    source: 'lastName',
    label: 'resources.users.fields.name',
};

export default FullNameField;

