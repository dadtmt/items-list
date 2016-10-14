
import R from 'ramda'
import { createSelector } from 'reselect'
import { indexBoardGames } from './boardGamesSelectors'
import { indexPlayers } from './playersSelectors'
import { lensItems } from '../reducers/itemsUtils'

export const allGamesSelector = R.prop('games')

export const populateBoardgame = R.curry(
  (boardGamesIndex, game) =>
    R.over(
      R.lensProp('boardGame'),
      R.flip(R.prop)(boardGamesIndex)
    )(game)
)

export const populatePlayers = R.curry(
  (playersIndex, game) =>
    R.over(
      R.lensProp('players'),
      R.map(
        R.over(
          R.lensProp('player'),
          R.flip(R.prop)(playersIndex)
        )
      )
    )(game)
)

export const populateGames = createSelector(
  [allGamesSelector, indexBoardGames, indexPlayers],
  (gamesState, boardGamesIndex, playersIndex) =>
    R.pipe(
      R.view(lensItems),
      R.map(
        R.pipe(
          populateBoardgame(boardGamesIndex),
          populatePlayers(playersIndex)
        )
      )
    )(gamesState)
)
