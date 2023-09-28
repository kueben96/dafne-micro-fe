import { useTheme, Box, Container, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import HeaderBreadcrumbs from './HeaderBreadcrumbs';
import { PageHeaderAppBar } from '../assets/theme/dafneStyles';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  subsubtitle?: string;
  editable?: boolean;
  onEditTitle?: (title: string) => void;
  titleChildren?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [originalTitle, setOriginalTitle] = useState(props.title);
  const [title, setTitle] = useState(props.title);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTitleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSaveClick();
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelClick = () => {
    if (title !== originalTitle) {
      setTitle(originalTitle);
      setIsEditable(false);
    } else {
      setIsEditable(false);
    }
  };

  const handleSaveClick = () => {
    if (title !== originalTitle) {
      setTitle(title);
      setOriginalTitle(title);
      props.onEditTitle?.(title);
    }
    setIsEditable(false);
  };

  const theme = useTheme();

  return (
    <PageHeaderAppBar sx={{ paddingBottom: theme.spacing(2) }} position="static" >
      <Toolbar>
        <Container>
          <Box display="flex" flexDirection="column" sx={{ flexGrow: 1 }}>
            <Box>
              <HeaderBreadcrumbs />
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center">
              {props.editable ? (
                <HeaderEditable
                  isEditable={isEditable}
                  title={title}
                  onTitleChange={handleTitleChange}
                  onTitleKeyPress={handleTitleKeyPress}
                  onEditClick={handleEditClick}
                  onSaveClick={handleSaveClick}
                  onCancelClick={handleCancelClick}
                />

              ) : (
                <Typography
                  variant='h4'
                  fontWeight="bold"
                  component="div"
                  sx={{ paddingTop: 1, paddingBottom: 1 }}>{title}</Typography>
              )
              }
              {props.titleChildren}
            </Box>
            {props.subsubtitle && (
              <Typography variant='subtitle2'>
                {props.subsubtitle}
              </Typography>
            )}
            {props.subtitle && (
              <Typography variant='h6'>
                {props.subtitle}
              </Typography>
            )}

          </Box>
        </Container>
      </Toolbar>
    </PageHeaderAppBar>
  );
};

export default PageHeader;

export enum HeaderSize {
  PageHeadline = 'PageHeadline',
  SmallHeader = 'SmallHeader',
}
interface HeaderEditableProps {
  title: string;
  isEditable?: boolean;
  onTitleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEditClick?: () => void;
  onSaveClick?: () => void;
  onCancelClick?: () => void;
  headerSize?: HeaderSize;
}

export const HeaderEditable: React.FC<HeaderEditableProps> = ({
  isEditable = false,
  title,
  onTitleChange,
  onTitleKeyPress,
  onEditClick,
  onSaveClick,
  onCancelClick,
  headerSize = HeaderSize.PageHeadline,
}) => {

  const getTypographyVariant = () => {
    switch (headerSize) {
      case HeaderSize.PageHeadline:
        return 'h4';
      case HeaderSize.SmallHeader:
        return 'h6';
      default:
        return 'h4';
    }
  };
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {isEditable ? (
        <>
          <TextField
            autoFocus
            margin="none"
            value={title}
            onChange={onTitleChange}
            onKeyPress={onTitleKeyPress}
            sx={{ width: '70%' }}
          />
          <IconButton onClick={onSaveClick}>
            <CheckOutlinedIcon sx={{ padding: '1px' }} />
          </IconButton>
          <IconButton onClick={onCancelClick}>
            <ClearOutlinedIcon sx={{ padding: '1px' }} />
          </IconButton>
        </>
      ) : (
        <>
          <Typography
            variant={getTypographyVariant()}
            fontWeight="bold"
            component="div"
            sx={{ paddingTop: 1, paddingBottom: 1 }}
          >
            {title}

          </Typography>
          <IconButton onClick={onEditClick}>
            <BorderColorOutlinedIcon sx={{ padding: '1px' }} />
          </IconButton>
        </>
      )}
    </Box>
  );
};
