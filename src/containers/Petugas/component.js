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
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { tableHeader } from './constant';
import datetime from '../../utils/datetime';
import { Add, MoreHoriz, Delete, Edit } from '@material-ui/icons';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import CallbackAlert from '../../components/elements/CallbackAlert'
import Dialog from '../../components/elements/Dialog'
import PetugasForm from '../../components/forms/Petugas'
import EditPetugasForm from '../../components/forms/PetugasEdit'

export default function Component(props) {
  const [alert, setAlert] = useState({ content: '', success: true });
  const [openFormPetugas, setOpenFormPetugas] = useState(false);
  const [openFormEditPetugas, setOpenFormEditPetugas] = useState(null);
  const [params, setParams] = useState({
    limit: 8,
    page: 1
  })

  const { isLoading, actions, listPetugas, classes } = props;
  const { data, meta } = listPetugas

  useEffect(() => {
    actions.getListPetugas(params);
  }, [params]);

  const handlePagination = (_event, value) => {
    setParams({ ...params, page: value})
  };
  
  const handleOpenEditForm = (id) => {
    actions.getDetailPetugas({id, callbackAlert: setAlert, callback: setOpenFormEditPetugas});
  };
  
  const handleDeletePetugas = (id, meta) => {
    actions.deletePetugas({id, callback: setAlert});
    if (meta.totalData % 8 === 1) {
      actions.getListPetugas({...params, page: params.page - 1});
    } else {
      actions.getListPetugas(params);
    }
  };

  const closeAlert = () => setAlert({ content: '', success: true });

  const renderAlert = (
    <CallbackAlert onClose={closeAlert} {...alert}/>
  );
  
  const normalizeData = (data) => {
    return data.map(item => ({
      ...item,
      createdAt: datetime(item.createdAt, 'date-time'),
      updatedAt: datetime(item.updatedAt, 'date-time'),
    }));
  };

  const handleAddPetugas = (values = {}) => {
    const payload = {
      name: values.name,
      telp: values.telp,
      username: values.username,
      password: values.password
    };

    setOpenFormPetugas(false)
    actions.addPetugas({ payload, callback: setAlert, currentParams: params });
  };
  
  const handleUpdatePetugas = (values = {}) => {
    const payload = {
      name: values.name,
      telp: values.telp,
      username: values.username,
      password: values.password
    };

    actions.updatePetugas({ id: openFormEditPetugas, payload, callbackAlert: setAlert, callback: setOpenFormEditPetugas, currentParams: params });
  };

  const renderPetugasForm = (
    <Dialog
      maxWidth="xs"
      onClose={() => setOpenFormPetugas(false)}
      open={openFormPetugas}
    >
      <PetugasForm
        onSubmit={handleAddPetugas}
      />
    </Dialog>
  );
  
  const renderEditPetugasForm = (
    <Dialog
      maxWidth="xs"
      onClose={() => setOpenFormEditPetugas(null)}
      open={openFormEditPetugas}
    >
      <EditPetugasForm
        onSubmit={handleUpdatePetugas}
      />
    </Dialog>
  );

  const topSection = (
    <Grid container spacing={2}>
      <Grid item md={4} xs={6}>
        <Typography component="span" variant="h4">Petugas</Typography>
      </Grid>
      <Grid item md={8} xs={6} align="right">
        <Grid container justify="flex-end" spacing={3}>
          <Grid item>
            <Button
              onClick={() => setOpenFormPetugas(true)}
              variant="contained"
              color="primary"
              startIcon={<Add />}
            >
              Petugas
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const tableHead = (
    <TableHead>
      <TableRow>
        {tableHeader.map( item => (
          <TableCell>{item.label}</TableCell>
        ))}
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
  
  const tableBody = (
    <TableBody>
      {!isLoading && normalizeData(data).map((item) => (
        <TableRow key={item.username}>
          {tableHeader.map( i => (
            <TableCell id={i.id}>{item[i.id] || '-'}</TableCell>
          ))}
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
                              <MenuItem onClick={() => handleOpenEditForm(item._id)}>
                                <ListItemIcon>
                                  <Edit fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Edit</Typography>
                              </MenuItem>
                              <MenuItem onClick={() => handleDeletePetugas(item._id, meta)}>
                                <ListItemIcon>
                                  <Delete fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Delete</Typography>
                              </MenuItem>
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
        {isLoading || !data.length ? tableBodyEmpty : tableBody}
      </Table>
    </TableContainer>
  );

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {topSection}
        </Grid>
        <Grid item xs={12}>
          <Divider/>
          {renderTable}
        </Grid>
        <Grid item xs={12} align="right">
          <Grid container justify="space-between" spacing={3}>
            <Grid item>
              <Typography component="span" variant="caption">
                {`Total Petugas: ${meta.totalData} Orang`}
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
      {renderPetugasForm}
      {renderEditPetugasForm}
    </Fragment>
  );
}
