package util

func SliceContains[T comparable](slice []T, e T) bool {
	for _, item := range slice {
		if item == e {
			return true
		}
	}
	return false
}
