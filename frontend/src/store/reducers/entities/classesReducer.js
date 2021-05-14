import { createSlice } from "@reduxjs/toolkit";
import entityTypes from "../../../util/types/entityTypes";

const initialState = {
    1: {
        id: 1,
        name: 'Barbarian',
        icon: 'axe-battle',
        description: 'For some, their rage springs from a communion with fierce animal spirits. Others draw from a roiling reservoir of anger at a world full of pain. For every barbarian, rage is a power that fuels not just a battle frenzy but also uncanny reflexes, resilience, and feats of strength.',
        hitDie: '1d12',
        armor: 'Light armor, medium armor, shields',
        weapons: 'All weapons',
        tools: 'None',
        saves: 'Fortitude, Reflex',
        spellcasting: 'None',
        skills: 'Choose any five',
        equipment: [
            "(a) A heavy martial weapon or (b) a versatile martial weapon and a shield or (c) two light martial weapons",
            "(a) Any simple ranged weapon or (b) two simple light weapons",
            "An explorer's pack"
        ],
        tableCols: {
            "Rages" : [
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2',
                '2'
            ],
            "Rage Damage": [
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2',
                '+2'
            ]
        },
        features: [
            [3],
            [2],
            [],
            [1],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
    }
};

const classesSlice = createSlice({
  name: entityTypes.CLASSES,
  initialState: {},
  reducers: {
    fetchAllClassesRequested: state => state,
    receiveAllClasses: (state, action) => {
        return action.payload.classes;
    }
  }
});

export const { fetchAllClassesRequested, receiveAllClasses } = classesSlice.actions;
export default classesSlice.reducer;