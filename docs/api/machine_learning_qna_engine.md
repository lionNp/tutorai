## Machine Learning QnA Engine API

### API URL
 ```
/tutorai/machine_learning/<question>/<context> (GET)
```

### Argument

| Name     | Type   | Required | Constraint | Description |
| -------- | ------ | -------- | ---------- | ----------- |
| question | String | yes      |            |             |
| context  | String | yes      |            | String that contains information to answere the question            |

### Return

| Name  | Type   | Description         |
| ----- | ------ | ------------------- |
| answere | String |                   |
