import React from 'react'

export const UserContext = React.createContext(null)
// export const OperationContext = React.createContext(null)

export const ContextProvider = UserContext.Provider
// export const OperationProvider = OperationContext.Provider
// export const UserConsumer = UserContext.Consumer

export default UserContext