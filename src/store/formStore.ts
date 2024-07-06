import {
  PersonalCaregiver,
  PersonalContractor,
  PersonalInfo,
  UnitBond,
} from '@/app/(admin-routes)/types/types'
import create from 'zustand'

interface State {
  payload: {
    beneficiaryData: PersonalInfo | null
    bondsData: UnitBond | null
    contractorData: PersonalContractor | null
    caregiverData: PersonalCaregiver[] | null
  }
  setBeneficiaryData: (data: PersonalInfo) => void
  setBondsData: (data: UnitBond) => void
  setContractorData: (data: PersonalContractor) => void
  setCaregiverData: (data: PersonalCaregiver[]) => void
  clearPayload: () => void
}

export const useStore = create<State>((set) => ({
  payload: {
    beneficiaryData: null,
    bondsData: null,
    contractorData: null,
    caregiverData: null,
  },
  setBeneficiaryData: (data: PersonalInfo) => {
    set((state) => ({
      payload: {
        ...state.payload,
        beneficiaryData: data,
      },
    }))
  },
  setBondsData: (data: UnitBond) => {
    set((state) => ({
      payload: {
        ...state.payload,
        bondsData: data,
      },
    }))
  },
  setContractorData: (data: PersonalContractor) => {
    set((state) => ({
      payload: {
        ...state.payload,
        contractorData: data,
      },
    }))
  },
  setCaregiverData: (data: PersonalCaregiver[]) => {
    set((state) => ({
      payload: {
        ...state.payload,
        caregiverData: data,
      },
    }))
  },
  clearPayload: () => {
    set(() => ({
      payload: {
        beneficiaryData: null,
        bondsData: null,
        contractorData: null,
        caregiverData: null,
      },
    }))
  },
}))
