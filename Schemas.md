_Note the "?" next to a field indicates that field is optional_

## User Schema

```
User {
  _id: ObjectId // user's ID
  firstName: string // user's first name
  lastName: string // user's last name
  email: string // user's email
  password: string // user's password used only in level 3 and beyond
  profilePicture?: string // pointer to user's profile picture in cloud storage --> used in Expert level
}
```

## Animal Schema

```
Animal {
  _id: ObjectId // animal's ID
  name: string // animal's name
  hoursTrained: number // total number of hours the animal has been trained for
  owner: ObjectId // id of the animal's owner
  dateOfBirth?: Date // animal's date of birth
  profilePicture?: string // pointer to animal's profile picture in cloud storage --> used in Expert level
}
```

## Training Log Schema

```
TrainingLog {
  _id: ObjectId // training log's id
  date: Date // date of training log
  description: string // description of training log
  hours: number // number of hours the training log records
  animal: ObjectId // animal this training log corresponds to
  user: ObjectId // user this training log corresponds to
  trainingLogVideo?: string // pointer to training log video in cloud storage --> used in Expert level
}
```
