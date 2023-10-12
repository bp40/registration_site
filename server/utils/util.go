package util

func IntSliceContains(slice []int, e int) bool {
	for _, n := range slice {
		if n == e {
			return true
		}
	}
	return false
}
