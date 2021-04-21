import React, { Fragment, useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Popper,
  Fade,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  Tabs,
  Tab,
  Link,
  Box
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import classnames from 'classnames';
import { tableHeader } from './constant';
import { IMAGES } from '../../configs';
import datetime from '../../utils/datetime';
import { isRole } from '../../utils/common';
import { Add, MoreHoriz, Check, Clear } from '@material-ui/icons';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import CallbackAlert from '../../components/elements/CallbackAlert';
import ConfirmationDialog from '../../components/elements/ConfirmationDialog';
import Dialog from '../../components/elements/Dialog';
import PengaduanForm from '../../components/forms/Pengaduan';
import RejectForm from '../../components/forms/Reject';
import ApproveForm from '../../components/forms/Approve';

export default function Component(props) {
  const [alert, setAlerts] = useState({ content: '', success: true });
  const [openFormPengaduan, setOpenFormPengaduan] = useState(false);
  const [openFormRejected, setOpenFormRejected] = useState(null);
  const [openFormApproved, setOpenFormApproved] = useState(null);
  const [openImageModal, setOpenImageModal] = useState(null);
  const [confirmation, setConfirmation] = useState({
    content: '',
    secondaryContent: '',
    actions: [],
  });
  const [activeTab, setActiveTab] = useState(0);
  const [params, setParams] = useState({
    limit: 8,
    page: 1,
    status: 'pending',
  })

  const { isLoading, actions, listPengaduan, classes } = props;
  const { data, meta } = listPengaduan

  useEffect(() => {
    actions.getListPengaduan(params);
  }, [params]);

  const handleChangeTab = (_event, value) => {
    setActiveTab(value)
    let status;
    switch (value) {
      case 0:
        status = 'pending';
        break;
      case 1:
        status = 'onprogress';
        break;
      case 2:
        status = 'history';
        break;
      default:
        break;
    }
    setParams({
      ...params,
      page: 1,
      status: status,
    })
  };
  
  const handlePagination = (_event, value) => {
    setParams({ ...params, page: value})
  };

  const setAlert = (params) => {
    setAlerts(params);
    setConfirmation({
      content: '',
      secondaryContent: '',
      actions: [],
    });
  };

  const closeAlert = () => setAlert({ content: '', success: true });

  const closeConfirmationDialog = () => setConfirmation({
    content: '',
    secondaryContent: '',
    actions: [],
  });

  const renderAlert = (
    <CallbackAlert onClose={closeAlert} {...alert}/>
  );

  const renderConfirmationDialog = (
    <ConfirmationDialog 
      {...confirmation} 
      onClose={closeConfirmationDialog}
    />
  );

  const normalizeData = (data) => {
    const photoC = ({ file }) => (
      <Link
        component="button"
        variant="body2"
        onClick={() => setOpenImageModal(file[0].fileName)}
      >
        {file[0].fileName}
      </Link>
    )
    
    const statusVariant = ({ status }) => (
      <div 
        className={classnames(classes.rootStatus, {
          [classes.blue]: status === 'Pending',
          [classes.green]: status === 'Approved',
          [classes.orange]: status === 'On Progress',
          [classes.red]: status === 'Rejected',
        },)}
      >
        <Typography 
          className={classnames({
            [classes.blue]: status === 'Pending',
            [classes.green]: status === 'Approved',
            [classes.orange]: status === 'On Progress',
            [classes.red]: status === 'Rejected',
          },)}
          component="div"
          fontWeight="fontWeightBold"
          variant="caption"
        >
          <Box fontWeight="fontWeightBold">
            {status}
          </Box>
        </Typography>
      </div>
    )

    return data.map(item => ({
      ...item,
      statusVariant: statusVariant(item),
      photo: photoC(item),
      createdBy: item.createdBy.name,
      createdAt: datetime(item.createdAt, 'date-time'),
      updatedAt: datetime(item.updatedAt, 'date-time'),
    }));
  };

  const handleAddPengaduan = (values) => {
    if (values.title && values.description && values.photo) {
      const payload = new FormData();
      payload.append('title', values.title);
      payload.append('description', values.description);
      payload.append('photos', values.photo);
      setOpenFormPengaduan(false)
      actions.addPengaduan({ payload, callback: setAlert, currentParams: params });
    }
  };

  const updateToRejected = (values = {}) => {
    const payload = {
      note: values.note,
      status: 'reject',
    };

    setOpenFormRejected(null)
    actions.updateStatus({ id: openFormRejected, payload, callback: setAlert, currentParams: params });
  }
  
  const updateToApproved = (values = {}) => {
    const payload = {
      note: values.note,
      status: 'approve',
    };

    setOpenFormApproved(null)
    actions.updateStatus({ id: openFormApproved, payload, callback: setAlert, currentParams: params });
  }

  const updateToOnProgress = (id) => {
    const payload = {
      status: 'onprogress',
    };

    actions.updateStatus({ id: id, payload, callback: setAlert, currentParams: params });
  }

  const renderPengaduanForm = (
    <Dialog
      maxWidth="xs"
      onClose={() => setOpenFormPengaduan(false)}
      open={openFormPengaduan}
    >
      <PengaduanForm
        onSubmit={(values) => setConfirmation({
          content: `Apakah anda yakin membuat pengaduan ini?`,
          actions: [
            { label: 'No', action: () => closeConfirmationDialog() },
            { label: 'Yes', action: () => handleAddPengaduan(values) },
          ],
        })}
      />
    </Dialog>
  );

  const renderRejectForm = (
    <Dialog
      maxWidth="xs"
      onClose={() => setOpenFormRejected(null)}
      open={openFormRejected}
    >
      <RejectForm
        onSubmit={(values) => setConfirmation({
          content: `Apakah anda yakin Reject pengaduan ini?`,
          actions: [
            { label: 'No', action: () => closeConfirmationDialog() },
            { label: 'Yes', action: () => updateToRejected(values) },
          ],
        })}
      />
    </Dialog>
  );
  
  const renderApproveForm = (
    <Dialog
      maxWidth="xs"
      onClose={() => setOpenFormApproved(null)}
      open={openFormApproved}
    >
      <ApproveForm
        onSubmit={(values) => setConfirmation({
          content: `Apakah anda yakin Approve pengaduan ini?`,
          actions: [
            { label: 'No', action: () => closeConfirmationDialog() },
            { label: 'Yes', action: () => updateToApproved(values) },
          ],
        })}
      />
    </Dialog>
  );
  
  const renderModalImage = (
    <Dialog
      customWidth={300}
      onClose={() => setOpenImageModal(null)}
      open={openImageModal}
    >
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <img
          src={`${IMAGES.IMAGE_PENGADUAN}${openImageModal}`}
          alt={openImageModal}
          style={{ width: '100%' }}
        />
      </div>
    </Dialog>
  );

  const topSection = (
    <Grid container spacing={2}>
      <Grid item md={4} xs={6}>
        <Typography component="span" variant="h4">Pengaduan</Typography>
      </Grid>
      <Grid item md={8} xs={6} align="right">
        <Grid container justify="flex-end" spacing={3}>
          <Grid item>
            {isRole('user') && (
              <Button
                onClick={() => setOpenFormPengaduan(true)}
                variant="contained"
                color="primary"
                startIcon={<Add />}
              >
                Pengaduan
              </Button>
            )}
            {isRole('admin') && activeTab === 2 && (
              <Button
                onClick={() => setConfirmation({
                  content: `Apakah anda yakin Generate Laporan?`,
                  actions: [
                    { label: 'No', action: () => closeConfirmationDialog() },
                    { label: 'Yes', action: () => actions.download({ callback: setAlert }) },
                  ],
                })}
                variant="contained"
                color="primary"
              >
                Download
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Tabs
          classes={{
            indicator: classes.tabsIndicator,
          }}
          disableRipple
          onChange={handleChangeTab}
          value={activeTab}
        >
          <Tab
            classes={{
              selected: classes.tabSelected
            }}
            disableTouchRipple
            key={'tabs1'}
            label="Pending"
          />
          <Tab
            classes={{
              root: classes.tabRoot,
              wrapper: classes.tabWrapper,
              selected: classes.tabSelected
            }}
            disableTouchRipple
            key={'tabs2'}
            label="On Progress"
          />
          <Tab
            classes={{
              root: classes.tabRoot,
              wrapper: classes.tabWrapper,
              selected: classes.tabSelected
            }}
            disableTouchRipple
            key={'tabs3'}
            label="History"
          />
        </Tabs>
      </Grid>
    </Grid>
  );

  const tableHead = (
    <TableHead>
      <TableRow>
        {tableHeader.map( item => (
          <TableCell>{item.label}</TableCell>
        ))}
        {!isRole('user') && activeTab !== 2 && <TableCell>Action</TableCell>}
      </TableRow>
    </TableHead>
  );

  const optionUpdate = ({ status, _id }) => {
    switch (status) {
      case 'Pending':
        return (
          <>
            <MenuItem onClick={() => setConfirmation({
              content: `Apakah anda yakin Approve pengaduan ini?`,
              actions: [
                { label: 'No', action: () => closeConfirmationDialog() },
                { label: 'Yes', action: () => updateToOnProgress(_id) },
              ],
            })}>
              <ListItemIcon>
                <Check fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Approve</Typography>
            </MenuItem>
            <MenuItem onClick={() => setOpenFormRejected(_id)}>
              <ListItemIcon>
                <Clear fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Reject</Typography>
            </MenuItem>
          </>
        )
      case 'On Progress':
        return (
          <>
            <MenuItem onClick={() => setOpenFormApproved(_id)}>
              <ListItemIcon>
                <Check fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Solve</Typography>
            </MenuItem>
            <MenuItem onClick={() => setOpenFormRejected(_id)}>
              <ListItemIcon>
                <Clear fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Reject</Typography>
            </MenuItem>
          </>
        )
      default:
        break;
    }
  };
  
  const tableBody = (
    <TableBody>
      {!isLoading && normalizeData(data).map((item) => (
        <TableRow key={item.username}>
          {tableHeader.map( i => (
            <TableCell 
              id={i.id}
              className={classes.cellBody}
            >
              {item[i.id] || '-'}
            </TableCell>
          ))}
          {!isRole('user') && activeTab !== 2 && (
            <TableCell>
              <PopupState variant="popper" popupId="popup-action">
                {(popupState) => (
                  <>
                    <Button color="primary" {...bindToggle(popupState)}>
                      <MoreHoriz />
                    </Button>
                    <Popper {...bindPopper(popupState)} transition>
                      {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                          <Paper>
                            <ClickAwayListener onClickAway={popupState.close}>
                              <MenuList>
                                {optionUpdate(item)}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Fade>
                      )}
                    </Popper>
                  </>
                )}
              </PopupState>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
  
  const tableBodyEmpty = (
    <TableBody>
      <TableRow className={classes.emptyData}>
        <TableCell colspan={10}>
          <Typography className={classes.emptyTitle} variant="body1">
            Data Tidak Ditemukan
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );

  const renderTable = (
    <TableContainer>
      <Table aria-label="simple table">
        {tableHead}
        { isLoading || !data.length ? tableBodyEmpty : tableBody}
      </Table>
    </TableContainer>
  );

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {topSection}
          <Divider/>
          {renderTable}
        </Grid>
        <Grid item xs={12} align="right">
          <Grid container justify="space-between" spacing={3}>
            <Grid item>
              <Typography component="span" variant="caption">
                {activeTab === 0 ? `Total Pending: ${meta.totalData} Data` : activeTab === 1 ? `Total On Progress: ${meta.totalData} Data` : `Total History: ${meta.totalData} Data`}
              </Typography>
            </Grid>
            {data.length && meta.lastPage > 1 && (
              <Grid item>
                <Pagination count={meta.lastPage} color="primary" onChange={handlePagination} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      {renderAlert}
      {renderConfirmationDialog}
      {renderPengaduanForm}
      {renderApproveForm}
      {renderRejectForm}
      {renderModalImage}
    </Fragment>
  );
}
