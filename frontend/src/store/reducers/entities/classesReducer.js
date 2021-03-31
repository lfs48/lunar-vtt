import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    1: {
        id: 1,
        name: 'Barbarian',
        description: 'For some, their rage springs from a communion with fierce animal spirits. Others draw from a roiling reservoir of anger at a world full of pain. For every barbarian, rage is a power that fuels not just a battle frenzy but also uncanny reflexes, resilience, and feats of strength.',
        hitDie: '1d12',
        armor: 'Light armor, medium armor, shields',
        weapons: 'All weapons',
        tools: 'None',
        saves: 'Fortitude, Reflex',
        skills: '8',
        equipment: [
            ['A heavy martial weapon', 'a versatile martial weapon and a shield', 'two light martial weapons'],
            ['Any simple ranged weapon', 'two simple light weapons'],
            ["An explorer's pack"]
        ],
        classTableCols: [
            {
                name: 'Rages',
                key: 'rages'
            },
            {
                name: 'Rage Damage',
                key: 'rageDmg'
            }
        ],
        classTable: [
            {
                features: [3],
                rages: '2',
                rageDmg: '+2'
            },
            {
                features: [2],
                rages: '2',
                rageDmg: '+2'
            },
            {
                features: [],
                rages: '3',
                rageDmg: '+2'
            },
            {
                features: [],
                rages: '3',
                rageDmg: '+2'
            },
            {
                features: [1],
                rages: '3',
                rageDmg: '+2'
            },
            {
                features: [],
                rages: '4',
                rageDmg: '+2'
            },
            {
                features: [],
                rages: '4',
                rageDmg: '+2'
            },
            {
                features: [],
                rages: '4',
                rageDmg: '+2'
            },
            {
                features: [],
                rages: '4',
                rageDmg: '+2'
            },
            {
                features: [],
                rages: '4',
                rageDmg: '+2'
            },
            {
                features: [],
                rages: '4',
                rageDmg: '+3'
            },
            {
                features: [1],
                rages: '5',
                rageDmg: '+3'
            },
            {
                features: [1],
                rages: '5',
                rageDmg: '+3'
            },
            {
                features: [1],
                rages: '5',
                rageDmg: '+3'
            },
            {
                features: [1],
                rages: '5',
                rageDmg: '+3'
            },
            {
                features: [1],
                rages: '5',
                rageDmg: '+3'
            },
            {
                features: [1],
                rages: '6',
                rageDmg: '+4'
            },
            {
                features: [1],
                rages: '6',
                rageDmg: '+4'
            },
            {
                features: [1],
                rages: '6',
                rageDmg: '+4'
            },
            {
                features: [1],
                rages: 'Unlimited',
                rageDmg: '+4'
            },
        ]
    },
    2: {
        id: 2,
        name: 'Fighter',
        description: 'Fighty boi',
    },
    3: {
        id: 3,
        name: 'Artificer',
        description: 'placeholder',
    },
    4: {
        id: 4,
        name: 'Bard',
        description: 'roll to seduce dragon harhar',
    },
    5: {
        id: 5,
        name: 'Cleric',
        description: 'catholic',
    },
    6: {
        id: 6,
        name: 'Druid',
        description: 'nature boi',
    },
};

const classesSlice = createSlice({
  name: 'dndClasses',
  initialState: initialState,
  reducers: {
    classesFetchRequested: state => state,
  }
});

export const {} = classesSlice.actions;
export default classesSlice.reducer;