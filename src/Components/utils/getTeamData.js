export const getTeamName = (matchData, teamName) => {
    let newTeamName;
    if (teamName === matchData.FirstBattingTeamName) {
        newTeamName = matchData.FirstBattingTeamName
    } else {
        newTeamName = matchData.SecondBattingTeamName
    }
    return newTeamName;
}

export const getTeamCode = (matchData, teamName) => {
    let teamCode;
    if (teamName === matchData.FirstBattingTeamName) {
        teamCode = matchData.FirstBattingTeamCode
    } else {
        teamCode = matchData.SecondBattingTeamCode
    }
    return teamCode;
}

export const getTeamScore = (matchData, teamName) => {
    let teamScore;
    if (teamName === matchData.FirstBattingTeamName) {
        teamScore = `${matchData['1FallScore']}/${matchData['1FallWickets']}`;
    } else {
        teamScore = `${matchData['2FallScore']}/${matchData['2FallWickets']}`;
    }
    return teamScore;
}

export const getTeamOvers = (matchData, teamName) => {
    let teamScore;
    if (teamName === matchData.FirstBattingTeamName) {
        teamScore = `${matchData['1FallOvers']} overs`;
    } else {
        teamScore = `${matchData['2FallOvers']} overs`;
    }
    return teamScore;
}

export const getCommentryStartText = (comm) => {
    let commText;
    const commArr = comm.split(",");
    commText = commArr[0];
    return commText;
}

export const getCommentryText = (comm) => {
    let commText;
    const commArr = comm.split(",");
    commText = commArr[0];
    return commText;
}
