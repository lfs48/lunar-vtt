import { all, call, put, takeLatest } from 'redux-saga/effects';
import { deleteRace, getAllRaces, patchRace, postRace } from '../../../util/api/apiRacesUtil';
import entityTypes from '../../../util/types/entityTypes';
import { createRace, deleteRaceSuccess, editRace, fetchAllRaces, receiveAllRaces, receiveRace, requestDeleteRace } from '../../reducers/entities/racesReducer';
import { openPanel } from '../../reducers/UI/panelsReducer';

function* fetchRacesWorker(action) {
    try {
        const res = yield call(getAllRaces);
        yield put({
            type: receiveAllRaces.type, 
            payload: res
        });
    } catch (e) {
        console.log(e);
    }
};

function* editRaceWorker(action) {
    try {
        const res = yield call(patchRace, action.payload);
        if (res.success) {
            yield put({
                type: receiveRace.type,
                payload: res
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* createRaceWorker(action) {
    try {
        const res = yield call(postRace, action.payload);
        if (res.success) {
            yield put({
                type: receiveRace.type,
                payload: res
            });
            yield put({
                type: openPanel.type,
                payload: {
                    id: res.race._id,
                    panelType: entityTypes.RACES,

                }
            });
        }
    } catch (e) {
        console.log(e);
    }
}

function* deleteRaceWorker(action) {
    try {
        const res = yield call(deleteRace, action.payload);
        if (res.success) {
            yield put({
                type: deleteRaceSuccess.type,
                payload: res
            })
        }
    } catch (e) {
        console.log(e);
    }
}

function* fetchRacesSaga() {
    yield takeLatest(fetchAllRaces.type, fetchRacesWorker);
};

function* editRaceSaga() {
    yield takeLatest(editRace.type, editRaceWorker);
}

function* createRaceSaga() {
    yield takeLatest(createRace.type, createRaceWorker)
}

function* deleteRaceSaga() {
    yield takeLatest(requestDeleteRace.type, deleteRaceWorker)
}

export function* racesSaga() {
    yield all([
        fetchRacesSaga(),
        editRaceSaga(),
        createRaceSaga(),
        deleteRaceSaga()
    ])
};