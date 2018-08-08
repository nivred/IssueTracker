document.querySelector('#inputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    var issueDesc = document.querySelector('#descInput').value;
    var issueSeverity = document.querySelector('#severityInput').value;
    var issueAssignment = document.querySelector('#assignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignment,
        status: issueStatus
    }

    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.querySelector('#inputForm').reset();

    fetchIssues();

    e.preventDefault();
}

function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.querySelector('#issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++){
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well>'+
                                '<h6>Issue ID: ' + id + '</h6>' +
                                '<p><span class="label label-info">' + status + '</span></p>' +
                                '<h3>' + desc + '</h3>' +
                                '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
                                '<p><span class="glyphicon glyphicon-time"></span>' + assignedTo + '</p>' +
                                '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning mr-1">Close</a>' +
                                '<a href="#" onclick="deletIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
                                '</div>'
    }
}